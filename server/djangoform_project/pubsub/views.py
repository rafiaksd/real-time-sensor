from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SensorData

class SensorDataAPI(APIView):
    def get(self, request):
        latest = SensorData.objects.order_by('-created_at')[:10]
        
        data = []

        for item in latest:
            entry = { 
                'temperature': item.temperature, 
                'humidity': item.humidity, 
                'timestamp': item.created_at 
            }

            data.append(entry)

        return Response(data)
