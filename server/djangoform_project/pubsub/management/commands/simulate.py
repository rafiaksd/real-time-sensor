import time
import random
from django.core.management.base import BaseCommand
from pubsub.models import SensorData

class Command(BaseCommand):
    help = 'Simulate sensor data every 10 seconds'

    def handle(self, *args, **kwargs):
        while True:
            temp = round(random.uniform(20, 30), 2)
            hum = round(random.uniform(40, 60), 2)
            SensorData.objects.create(temperature=temp, humidity=hum)
            self.stdout.write(f"Saved temp={temp}, hum={hum}")
            time.sleep(10)