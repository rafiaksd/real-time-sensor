from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SensorData

class SensorDataAPI(APIView):
    def get(self, request):
        latest = SensorData.objects.order_by('-created_at')[:10]
        return Response([
            {
                'temperature': d.temperature,
                'humidity': d.humidity,
                'timestamp': d.created_at
            }
            for d in latest
        ])