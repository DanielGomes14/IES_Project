import random
import asyncio
import paho.mqtt.client as mqtt
import json
#import Adafruit_DHT
import threading
from concurrent.futures import ProcessPoolExecutor
from datetime import datetime
import RPi.GPIO as GPIO
import time
import requests


# client, user and device details
serverUrl   = "crow.rmq.cloudamqp.com"
clientId    = "0d3ab6cf-c9a3-4ebc-9813-40c2920ecdba"
device_name = "GeaniHouse"
username    = "yhdzdjbl:yhdzdjbl"
password    = "z6HVKbDR7NpinRi80TFEymkvJmdsXG1m"

receivedMessages = []

class Generator:
    sigma = 0.1
    time_per_pub = 5

    @classmethod
    async def send_shuffled(cls, sensor_data):
        count = 0
        await asyncio.sleep(0)
        while sensor_data:
            await asyncio.sleep(cls.time_per_pub/len(sensor_data))
            sensor_id = list(sensor_data.keys())[count % len(sensor_data)]

            value = sensor_data[sensor_id].pop(0)
            print(cls.__name__, {
                'method': 'SENSORDATA',
                'id': sensor_id,
                'type': str.lower(cls.__name__), 
                'value': round(value, 2),
                'timestamp': datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
            })
            # send data to rabbit
            publish(topic=cls.__name__, message=json.dumps( {
                'method': 'SENSORDATA',
                'id': sensor_id,
                'type': str.lower(cls.__name__), 
                'value': round(value, 2),
                'timestamp': datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
            } ))

            if sensor_id not in cls.sensor_mu or not sensor_data[sensor_id]:
                # deleted my rabbitMQ meanwhile or already empty
                del sensor_data[sensor_id]
            count += 1


class Device:
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)#Button to GPIO23
    GPIO.setup(24, GPIO.OUT)  #LED to GPIO24
    lit = False
    url = 'http://www.localhost:8080/devices'

    @classmethod
    def setLit(cls, value):
        cls.lit = value
        GPIO.output(24, value)
    
    @classmethod
    def button_press(cls):
        r = requests.put(cls.url, data = {id:1, state:not cls.lit})

    @classmethod
    def start(cls):
        try:
            while True:
                button_state = GPIO.input(23)
                if button_state == False:
                    cls.button_press()
                    print('Button Pressed...')
                    time.sleep(0.2)
        except:
            GPIO.cleanup()



class Temperature(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 0, 37

    @classmethod
    async def start(cls):
        global temp_queue
        while True:
            await asyncio.sleep(0)
            for sensor in list(cls.sensor_mu):
                if sensor not in cls.sensor_mu:
                    break
                lst = cls.sensor_mu[sensor]
                mu, value = lst[0], lst[1]
                mu += random.random()-0.5
                if value:
                    mu += (value-mu) * 0.05
                if mu > cls.MAX - cls.sigma:
                    mu -= .5 
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor][0] = mu


class Luminosity(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 0, 90

    @classmethod
    async def start(cls):
        while True:
            await asyncio.sleep(0)
            for sensor in list(cls.sensor_mu):
                if sensor not in cls.sensor_mu:
                    break
                lst = cls.sensor_mu[sensor]
                mu, value = lst[0], lst[1]

                if value:
                    mu = value
                else:
                    mu = 50 # TODO: func seno
                if mu > cls.MAX - cls.sigma:
                    mu -= .5 
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor][0] = mu


class Humidity(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 30, 70

    @classmethod
    async def start(cls):
        while True:
            await asyncio.sleep(0)
            for sensor in list(cls.sensor_mu):
                if sensor not in cls.sensor_mu:
                    break
                lst = cls.sensor_mu[sensor]
                mu, value = lst[0], lst[1]

                mu += random.random()-0.5
                if value:
                    mu += (value-mu) * 0.005
                if mu > cls.MAX - cls.sigma:
                    mu -= .5
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor][0] = mu


def on_message(client, userdata, message):
    print("Received operation " + str(message.payload))
    
    message = json.loads(message.payload.decode())

    method = message.get('method')
    sensor_type = message.get('type') 
    sensor_id = message.get('id')
    value = message.get('value')
    # receive message from rabbit
    if method == 'ADDSENSOR':
        if sensor_type == 'Temperature':
            Temperature.sensor_mu[sensor_id] = [value,None]
        elif sensor_type == 'Humidity':
            Humidity.sensor_mu[sensor_id] = [value,None]
        elif sensor_type == 'Luminosity':
            Luminosity.sensor_mu[sensor_id] = [value,None]

    elif method == 'REMOVESENSOR':
        
        elif sensor_type == 'Temperature':
            del Temperature.sensor_mu[sensor_id]
        elif sensor_type == 'Humidity':
            del Humidity.sensor_mu[sensor_id]
        elif sensor_type == 'Luminosity':
            del Luminosity.sensor_mu[sensor_id]        
        
    elif method == 'START_CONF':
        
        if sensor_type == 'Temperature':
            Temperature.sensor_mu[sensor_id][1] = value
        elif sensor_type == 'Humidity':
            Humidity.sensor_mu[sensor_id][1] = value
        elif sensor_type == 'Luminosity':
            Luminosity.sensor_mu[sensor_id][1] = value 

    elif method == 'END_CONF':
        
        elif sensor_type == 'Temperature':
            Temperature.sensor_mu[sensor_id][1] = None
        elif sensor_type == 'Humidity':
            Humidity.sensor_mu[sensor_id][1] = None
        elif sensor_type == 'Luminosity':
            Luminosity.sensor_mu[sensor_id][1] = None 

    elif method == "DEVICE":
        Device.setLit(value)

def publish(topic, message, waitForAck=False):
    mid = client.publish(topic, message)[1]
    if (waitForAck):
        while mid not in receivedMessages:
            time.sleep(0.25)


def on_publish(client, userdata, mid):
    print('on_publish')
    receivedMessages.append(mid)


# connect the client to Cumulocity IoT and register a device
client = mqtt.Client(clientId)
client.username_pw_set(username, password)
client.on_message = on_message
client.on_publish = on_publish

client.connect(serverUrl)
client.loop_start()

print("Device registered successfully!")

client.subscribe("Sensors", qos=2)

loop = asyncio.get_event_loop()
    
temp_task = loop.create_task(Temperature.start())
lum_task = loop.create_task(Luminosity.start())
hum_task = loop.create_task(Humidity.start())

loop.run_until_complete(asyncio.gather(temp_task, lum_task, hum_task))

loop.close()
