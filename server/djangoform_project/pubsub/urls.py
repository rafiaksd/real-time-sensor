from django.urls import path
from .views import SensorDataAPI

urlpatterns = [
     path('api/data', SensorDataAPI.as_view())
]