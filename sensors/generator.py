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

            if sensor_id not in cls.sensor_mu:
                # deleted my rabbitMQ meanwhile
                del sensor_data[sensor_id]
            if not sensor_data[sensor_id]:
                # already empty
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
            sensor_data = {k: [] for k in cls.sensor_mu}
            
            for sensor in list(cls.sensor_mu):
                mu = cls.sensor_mu[sensor]

                mu += random.random() - 0.5 - 2 * cls.decrease
                if mu > cls.MAX:
                    mu -= .5 
                elif mu < cls.MIN:
                    mu += .5

                sensor_data[sensor] = [random.gauss(mu, cls.sigma)]
                cls.sensor_mu[sensor] = mu

            print('antes await')
            await cls.send_shuffled(sensor_data)
            print('dps await')


class Luminosity(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 0, 90

    @classmethod
    async def start(cls):
        while True:
            sensor_data = {k: [] for k in cls.sensor_mu}

            for sensor in list(cls.sensor_mu):
                mu = cls.sensor_mu[sensor]
                window_opened = random.random() < 0.95

                mu += random.random() - 0.5 - 2 * cls.decrease
                if mu > cls.MAX:
                    mu -= .5 
                elif mu < cls.MIN:
                    mu += .5

                sensor_data[sensor] = [random.gauss(mu * window_opened, cls.sigma)]
                sensor_data[sensor] = [random.gauss(mu, cls.sigma)]

                cls.sensor_mu[sensor] = mu

            await cls.send_shuffled(sensor_data)


class Humidity(Generator):
    sensor_mu = {}
    decrease = False
    MIN, MAX = 30, 70

    @classmethod
    async def start(cls):
        while True:
            sensor_data = {k: [] for k in cls.sensor_mu}

            for sensor in list(cls.sensor_mu):
                mu = cls.sensor_mu[sensor]

                mu += random.random() - 0.5
                if mu > cls.MAX:
                    mu -= .2 + 2 * cls.decrease
                elif mu < cls.MIN:
                    mu += .2

                sensor_data[sensor] = [random.gauss(mu, cls.sigma)]
                cls.sensor_mu[sensor] = mu

            await cls.send_shuffled(sensor_data)


def on_message(client, userdata, message):

    print("Received operation " + str(message.payload))
    

    message = json.loads(message.payload.decode())

    method = message['method']
    type = message['type'] 
    id   = message['sensor_id']
    value = message['value']
    # receive message from rabbit
    if method == 'ADDSENSOR':
        if type == 'Temperature':
            
            #if Sensor.temperature_sensor == None:
            #    Sensor.temperature_sensor = id
            #else:
            Temperature.sensor_mu[id] = value
            print(id,type)
        elif type == 'Humidity':

            #if Sensor.humidity_sensor == None:
            #    Sensor.humidity_sensor = id
            #else:
            Humidity.sensor_mu[id]    = random.randint(Humidity.MIN, Humidity.MAX)

        elif type == 'Luminosity':
            Luminosity.sensor_mu[id]  = random.randint(Luminosity.MIN, Luminosity.MAX) 

    elif method == 'DEL':
        
        if Sensor.temperature_sensor == id:
            Sensor.temperature_sensor = None
        if Sensor.humidity_sensor == id:
            Sensor.humidity_sensor = None
        elif type == 'Temperature':
            del Temperature.sensor_mu[id]
        elif type == 'Humidity':
            del Humidity.sensor_mu[id]
        elif type == 'Luminosity':
            del Luminosity.sensor_mu[id]        
        
    elif method == 'CONFIG':
        value = message['value']
        if Sensor.temperature_sensor == id:
            Sensor.temperature_config = value
        if Sensor.humidity_sensor == id:
            Sensor.humidity_config = value
        elif type == 'Temperature':
            Temperature.sensor_mu[id] = value
        elif type == 'Humidity':
            Humidity.sensor_mu[id]    = value
        elif type == 'Luminosity':
            Luminosity.sensor_mu[id]  = value 

    topic = message['topic']
    type = message['type'] 
    id   = message['id']
    # receive message from rabbit
    if topic == 'ADD':
        
        if type == 'Temperature':
            
            #if Sensor.temperature_sensor == None:
            #    Sensor.temperature_sensor = id
            #else:
            Temperature.sensor_mu[id] = random.randint(Temperature.MIN, Temperature.MAX)
            print(id,type)
        elif type == 'Humidity':

            #if Sensor.humidity_sensor == None:
            #    Sensor.humidity_sensor = id
            #else:
            Humidity.sensor_mu[id]    = random.randint(Humidity.MIN, Humidity.MAX)

        elif type == 'Luminosity':
            Luminosity.sensor_mu[id]  = random.randint(Luminosity.MIN, Luminosity.MAX) 

    elif topic == 'DEL':
        
        if Sensor.temperature_sensor == id:
            Sensor.temperature_sensor = None
        if Sensor.humidity_sensor == id:
            Sensor.humidity_sensor = None
        elif type == 'Temperature':
            del Temperature.sensor_mu[id]
        elif type == 'Humidity':
            del Humidity.sensor_mu[id]
        elif type == 'Luminosity':
            del Luminosity.sensor_mu[id]        
        
    elif topic == 'CONFIG':
        value = message['value']
        if Sensor.temperature_sensor == id:
            Sensor.temperature_config = value
        if Sensor.humidity_sensor == id:
            Sensor.humidity_config = value
        elif type == 'Temperature':
            Temperature.sensor_mu[id] = value
        elif type == 'Humidity':
            Humidity.sensor_mu[id]    = value
        elif type == 'Luminosity':
            Luminosity.sensor_mu[id]  = value 



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

client.subscribe("sensors", qos=0)

loop = asyncio.get_event_loop()
temp_queue = asyncio.Queue(loop=loop)
lum_queue = asyncio.Queue(loop=loop)
hum_queue = asyncio.Queue(loop=loop)

    
temp_task = loop.create_task(Temperature.start())
lum_task = loop.create_task(Luminosity.start())
hum_task = loop.create_task(Humidity.start())

loop.run_until_complete(asyncio.gather(temp_task, lum_task, hum_task))

loop.close()
