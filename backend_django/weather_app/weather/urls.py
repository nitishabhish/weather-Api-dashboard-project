

from django.urls import path
from . import views
urlpatterns = [
    path('/weather_data',views.index.as_view() ),
    path('/aqi',views.aqi.as_view() ),
    path('/historic',views.historic_data.as_view() )
]