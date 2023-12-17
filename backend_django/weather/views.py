from django.shortcuts import render
import requests
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
class index(APIView):
    def get(self, request, **kwargs):

        city_name = request.query_params.get('city_name')

        appid = 'd05e1758bce4002052bb143c355132a2'
        URL = 'https://api.openweathermap.org/data/2.5/weather'
        PARAMS = {'q':f'{city_name}', 'appid':appid, 'units':'metric'}
        request = requests.get(url = URL, params = PARAMS)
        res = request.json()
        description = res['weather'][0]['description']
        icon = res['weather'][0]['icon']
        temp = res['main']['temp']
        wind_speed = res['wind']['speed']
        humidity = res['main']['humidity']
        visibility = res['visibility']


        return Response({'description':description,'icon':icon,
                         'temp':temp,'wind_speed':wind_speed,'humidity':humidity, 'visibility':visibility })

class aqi(APIView):

    def get(self, request, **kwargs):

        city_name = request.query_params.get('city_name')
        appid = 'd05e1758bce4002052bb143c355132a2'

        URL_geo_data = 'http://api.openweathermap.org/geo/1.0/direct'
        PARAMS_GEO = {'q': f'{city_name}', 'appid': appid, 'limit': 1}
        request_geo = requests.get(url=URL_geo_data, params=PARAMS_GEO)
        res_geo = request_geo.json()
        lat = res_geo[0]['lat']
        lon = res_geo[0]['lon']

        URL = 'http://api.openweathermap.org/data/2.5/air_pollution'


        # urls = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
        PARAMS = {'lat':f'{lat}','lon': f'{lon}', 'appid': appid }

        request = requests.get(url = URL, params = PARAMS)
        res = request.json()
        weather_list = res["list"]


        return Response({'weather-list':weather_list,})


class historic_data(APIView):

    def get(self, request, **kwargs):

        city_name = request.query_params.get('city_name')
        start = request.query_params.get('start')
        end = request.query_params.get('end')

        appid = 'd05e1758bce4002052bb143c355132a2'

        URL_geo_data = 'http://api.openweathermap.org/geo/1.0/direct'
        PARAMS_GEO = {'q': f'{city_name}', 'appid': appid, 'limit': 1}
        request_geo = requests.get(url=URL_geo_data, params=PARAMS_GEO)
        res_geo = request_geo.json()
        lat = res_geo[0]['lat']
        lon = res_geo[0]['lon']

        URL = 'http://api.openweathermap.org/data/2.5/air_pollution/history'
        PARAMS = {'lat':f'{lat}','lon': f'{lon}', 'appid': appid, 'start': start,'end': end }

        request = requests.get(url = URL, params = PARAMS)
        res = request.json()
        weather_list = res["list"]


        return Response({'weather-list':weather_list,})