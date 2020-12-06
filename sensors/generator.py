import random
import time
import asyncio


class Generator:
    sigma = 0.5


class TempGenerator(Generator):
    mu = 25
    decrease = False
    MIN, MAX = 0, 37

    async def get():
        self.mu_temp += random.random() - 0.5
        if self.mu_temp > self.MAX_TEMP:
            self.mu_temp -= .5 + 2 * decrease
        elif self.mu_temp < self.MIN_TEMP:
            self.mu_temp += .5
        for i in range(10):
            ret = ret.append(random.gauss(self.mu_temp, self.sigma))
        return ret


class LumGenerator(Generator):
    mu = 50
    decrease = False
    MIN, MAX = 0, 90

    async def get():
        self.mu += random.random() - 0.5
        window_opened = random.random() < 0.95
        if self.mu > self.MAX:
            self.mu -= .5 + 2 * decrease
        elif self.mu < self.MIN:
            self.mu += .5
        for i in range(10):
            ret.append(random.gauss(self.mu * window_opened, self.sigma))
        return ret


class HumGenerator(Generator):
    mu = 50
    decrease = False
    MIN, MAX = 30, 70

    async def get():
        self.mu += random.random() - 0.5
        if self.mu > self.MAX:
            self.mu -= .5 + 2 * decrease
        elif self.mu < self.MIN:
            self.mu += .5
        for i in range(10):
            ret.append(random.gauss(self.mu, self.sigma))
        return ret


async def rabbit_rcv():
    ...


while True:
    
    time.sleep(.1)
    gen = Generator()
    data = [gen.get_temperature(), gen.get_luminosity(), gen.get_humidity()]

    while data:
        i = random.randrange(len(data))

        print(data[i].pop())

        if not data[i]:
            del data[i]

    break

temp_gen = TempGenerator()
lum_gen = LumGenerator()
hum_gen = HumGenerator()

loop = asyncio.get_event_loop()

temp_queue = asyncio.Queue(loop=loop)
lum_queue = asyncio.Queue(loop=loop)
hum_queue = asyncio.Queue(loop=loop)

loop.create_task(temp_gen.get())
loop.create_task(lum_gen.get())
loop.create_task(hum_gen.get())
loop.create_task(rabbit_rcv())