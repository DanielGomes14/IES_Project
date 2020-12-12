import random
import time
import asyncio
import paho.mqtt.client as mqtt
import json
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

    @classmethod
    async def send_shuffled(cls, sensor_data):
        while sensor_data:
            await asyncio.sleep(5)
            rnd_sensor = random.choice(list(sensor_data.keys()))

            value = sensor_data[rnd_sensor].pop(0)
            print(cls.__name__, {
                'sensor_id': rnd_sensor,
                'type': str.lower(cls.__name__), 
                'value': round(value, 2),
                'timestamp': str(datetime.now())
            })
            # send data to rabbit
            publish(topic=cls.__name__, message=json.dumps( {
                'sensor_id': rnd_sensor,
                'type': str.lower(cls.__name__), 
                'value': round(value, 2),
                'timestamp': str(datetime.now())
            } ))

            if rnd_sensor not in cls.sensor_mu:
                # deleted my rabbitMQ meanwhile
                del sensor_data[rnd_sensor]
            if not sensor_data[rnd_sensor]:
                # already empty
                del sensor_data[rnd_sensor]


class Temperature(Generator):
    sensor_mu = {1: 25, 2: 10}
    decrease = False
    MIN, MAX = 0, 37

    @classmethod
    async def start(cls):
        while True:
            sensor_data = {k: [] for k in cls.sensor_mu}

            for sensor in list(cls.sensor_mu):
                mu = cls.sensor_mu[sensor]

                mu += random.random() - 0.5
                if mu > cls.MAX:
                    mu -= .5 + 2 * cls.decrease
                elif mu < cls.MIN:
                    mu += .5

                for _ in range(10):
                    await asyncio.sleep(0)
                    sensor_data[sensor].append( random.gauss(mu, cls.sigma) )
                cls.sensor_mu[sensor] = mu

            await cls.send_shuffled(sensor_data)


class Luminosity(Generator):
    sensor_mu = {1: 50, 2: 40}
    decrease = False
    MIN, MAX = 0, 90

    @classmethod
    async def start(cls):
        while True:
            sensor_data = {k: [] for k in cls.sensor_mu}

            for sensor in list(cls.sensor_mu):
                mu = cls.sensor_mu[sensor]
                window_opened = random.random() < 0.95

                mu += random.random() - 0.5
                if mu > cls.MAX:
                    mu -= .5 + 2 * cls.decrease
                elif mu < cls.MIN:
                    mu += .5

                for _ in range(10):
                    await asyncio.sleep(0)
                    sensor_data[sensor].append( random.gauss(mu * window_opened, cls.sigma) )
                cls.sensor_mu[sensor] = mu

            await cls.send_shuffled(sensor_data)


class Humidity(Generator):
    sensor_mu = {1: 50, 2: 60}
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

                for _ in range(10):
                    await asyncio.sleep(0)
                    sensor_data[sensor].append( random.gauss(mu, cls.sigma) )
                cls.sensor_mu[sensor] = mu

            await cls.send_shuffled(sensor_data)


def on_message(client, userdata, message):
    print("Received operation " + str(message.payload))

    topic = message.topic
    # receive message from rabbit

    if topic == 'ADD':
        ...
    elif topic == 'DEL':
        ...
    elif topic == 'CONFIG':
        ...

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