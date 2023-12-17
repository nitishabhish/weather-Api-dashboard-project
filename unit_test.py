import unittest
import requests


class TestWeatherAPI(unittest.TestCase):

    def test_weather_data(self):

        api_url = "http://127.0.0.1:8000/weather/weather_data"
        city_name = "lucknow"

        response = requests.get(api_url, params={'city_name': city_name})

        self.assertEqual(response.status_code, 200)

        actual_response = response.json()

        self.assertIn('description', actual_response)
        self.assertIn('icon', actual_response)
        self.assertIn('temp', actual_response)
        self.assertIn('wind_speed', actual_response)
        self.assertIn('humidity', actual_response)
        self.assertIn('visibility', actual_response)

        self.assertIsInstance(actual_response['temp'], (float, int))
        self.assertIsInstance(actual_response['wind_speed'], (float, int))
        self.assertIsInstance(actual_response['humidity'], int)

    def test_aqi_data(self):

        api_url = "http://127.0.0.1:8000/weather/aqi"


        city_name = "lucknow"

        response = requests.get(api_url, params={'city_name': city_name})
        self.assertEqual(response.status_code, 200)
        actual_response = response.json()
        self.assertIn('weather-list', actual_response)
        self.assertIsInstance(actual_response['weather-list'], list)
        if actual_response['weather-list']:
            weather_data = actual_response['weather-list'][0]

            self.assertIn('main', weather_data)
            self.assertIn('components', weather_data)
            self.assertIn('dt', weather_data)

            main_data = weather_data['main']
            self.assertIn('aqi', main_data)
            self.assertIsInstance(main_data['aqi'], int)

            components_data = weather_data['components']
            for component, value in components_data.items():
                self.assertIsInstance(value, (float, int))

    def test_historic_weather_data(self):

        api_url = "http://127.0.0.1:8000/weather/historic"
        params = {'city_name': 'lucknow', 'start': 1606488670, 'end': 1606747870}
        response = requests.get(api_url, params=params)
        self.assertEqual(response.status_code, 200)
        actual_response = response.json()
        self.assertIn('weather-list', actual_response)
        self.assertIsInstance(actual_response['weather-list'], list)

        if actual_response['weather-list']:
            for weather_data in actual_response['weather-list']:
                self.assertIn('main', weather_data)
                self.assertIn('components', weather_data)
                self.assertIn('dt', weather_data)

                main_data = weather_data['main']
                self.assertIn('aqi', main_data)
                self.assertIsInstance(main_data['aqi'], int)

                components_data = weather_data['components']
                for component, value in components_data.items():
                    self.assertIsInstance(value, (float, int))
if __name__ == '__main__':
    unittest.main()
