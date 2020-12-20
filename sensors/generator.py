import random
import asyncio
import paho.mqtt.client as mqtt
import json
#import Adafruit_DHT
import threading
from concurrent.futures import ProcessPoolExecutor
from datetime import datetime

# client, user and device details
serverUrl   = "crow.rmq.cloudamqp.com"
clientId    = "0d3ab6cf-c9a3-4ebc-9813-40c2920ecdba"
device_name = "GeaniHouse"
username    = "yhdzdjbl:yhdzdjbl"
password    = "z6HVKbDR7NpinRi80TFEymkvJmdsXG1m"

receivedMessages = []

class Generator:
    sigma = 0.5
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


class Sensor(Generator):
    temperature_sensor = None
    humidity_sensor    = None
    temperature_config = None
    humidity_config    = None

    @classmethod
    async def start(cls):
        while True:
            humidity, temperature = Adafruit_DHT.read_retry(11, 4)

            sensor_data = {}
            if temperature_sensor != None:
                sensor_data[temperature_sensor] = temperature if temperature_config==None else temperature_config+(1/temperature)*random.random()*2-1
            if humidity_sensor != None:
                sensor_data[humidity_sensor] = humidity if humidity_config==None else humidity_config+(1/humidity)*random.random()*2-1
            
            await cls.send_shuffled(sensor_data)


class Temperature(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 0, 37

    @classmethod
    async def start(cls):
        global temp_queue
        while True:
            print(cls.sensor_mu)
            await asyncio.sleep(0)
            for sensor in list(cls.sensor_mu):
                if sensor not in cls.sensor_mu:
                    break
                mu = cls.sensor_mu[sensor]

                mu += random.random() - 0.5 - 2 * cls.decrease
                if mu > cls.MAX - cls.sigma:
                    mu -= .5 
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor] = mu


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
                mu = cls.sensor_mu[sensor]
                window_opened = random.random() < 0.95

                mu += random.random() - 0.5 - 2 * cls.decrease
                if mu > cls.MAX - cls.sigma:
                    mu -= .5 
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu * window_opened, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor] = mu


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
                mu = cls.sensor_mu[sensor]

                mu += random.random() - 0.5 - 2 * cls.decrease
                if mu > cls.MAX - cls.sigma:
                    mu -= .5
                elif mu < cls.MIN + cls.sigma:
                    mu += .5

                await cls.send_shuffled({sensor: [random.gauss(mu, cls.sigma)]})
                if sensor not in cls.sensor_mu:
                    break
                cls.sensor_mu[sensor] = mu


def on_message(client, userdata, message):
    print("Received operation " + str(message.payload))
    
    message = json.loads(message.payload.decode())

    method = message['method']
    sensor_type = message['type'] 
    sensor_id = message['id']
    value = message['value']
    # receive message from rabbit
    if method == 'ADDSENSOR':
        if sensor_type == 'Temperature':
            #if Sensor.temperature_sensor == None:
            #    Sensor.temperature_sensor = id
            #else:
            Temperature.sensor_mu[sensor_id] = value
            print(sensor_id,sensor_type)
        elif sensor_type == 'Humidity':
            #if Sensor.humidity_sensor == None:
            #    Sensor.humidity_sensor = id
            #else:
            Humidity.sensor_mu[sensor_id] = value
        elif sensor_type == 'Luminosity':
            Luminosity.sensor_mu[sensor_id] = value

    elif method == 'REMOVESENSOR':
        if Sensor.temperature_sensor == sensor_id:
            Sensor.temperature_sensor = None
        if Sensor.humidity_sensor == sensor_id:
            Sensor.humidity_sensor = None
        elif sensor_type == 'Temperature':
            print(type(id))
            print(sensor_id in Temperature.sensor_mu)
            print(Temperature.sensor_mu)
            del Temperature.sensor_mu[sensor_id]
            print(Temperature.sensor_mu)
            if sensor_id in Temperature.sensor_mu:
                Temperature.sensor_mu.pop(sensor_id, None)
            print(Temperature.sensor_mu)   
        elif sensor_type == 'Humidity':
            del Humidity.sensor_mu[sensor_id]
        elif sensor_type == 'Luminosity':
            del Luminosity.sensor_mu[sensor_id]        
        
    elif method == 'CONFIGSENSOR':
        if Sensor.temperature_sensor == id:
            Sensor.temperature_config = value
        if Sensor.humidity_sensor == id:
            Sensor.humidity_config = value
        elif type == 'Temperature':
            Temperature.sensor_mu[id] = value
        elif type == 'Humidity':
            Humidity.sensor_mu[id] = value
        elif type == 'Luminosity':
            Luminosity.sensor_mu[id] = value 


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
