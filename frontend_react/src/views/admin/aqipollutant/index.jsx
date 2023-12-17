import React, { useState } from "react";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
   } from "@chakra-ui/react";
import API_URLS from '../../.././config';

const getQualitativeNamePollutants = (pollutant, concentration) => {
  switch (pollutant) {
    case 'SO2':
      return getQualitativeScore(concentration, [0, 20], [20, 80], [80, 250], [250, 350], '⩾350');
    case 'NO2':
      return getQualitativeScore(concentration, [0, 40], [40, 70], [70, 150], [150, 200], '⩾200');
    case 'PM10':
      return getQualitativeScore(concentration, [0, 20], [20, 50], [50, 100], [100, 200], '⩾200');
    case 'PM2.5':
      return getQualitativeScore(concentration, [0, 10], [10, 25], [25, 50], [50, 75], '⩾75');
    case 'O3':
      return getQualitativeScore(concentration, [0, 60], [60, 100], [100, 140], [140, 180], '⩾180');
    case 'CO':
      return getQualitativeScore(concentration, [0, 4400], [4400, 9400], [9400, 12400], [12400, 15400], '⩾15400');
    case 'AQI':
      return getQualitativeScore(concentration, [0, 1.1], [1.1, 2.1], [2.1, 3.1], [3.1, 4.1], [4.1, 5.1]);
    default:
      return ''; 
  }
};


const getQualitativeScore = (concentration, ...ranges) => {
  for (let i = 0; i < ranges.length; i++) {
    const [min, max] = ranges[i];
    if (concentration >= min && concentration < max) {
      return getQualitativeLabel(i + 1);
    }
  }
  return getQualitativeLabel(ranges.length + 1);
};
const getQualitativeLabel = (index) => {
  switch (index) {
    case 1:
      return 'Good';
    case 2:
      return 'Fair';
    case 3:
      return 'Moderate';
    case 4:
      return 'Poor';
    case 5:
      return 'Very Poor';
    default:
      return ''; // Handle other cases as needed
  }
};

const WeatherInfo = () => {
  const [cityName, setCityName] = useState("");
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };
  const handleRecommendationClick = () => {
    setShowRecommendation(true);
  };
  
  const onCloseRecommendation = () => {
    setShowRecommendation(false);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URLS.BASE_URL}/aqi?city_name=${cityName}`);
      const data = await response.json();
      const newWeatherData = {
        cityName,
        aqi: data["weather-list"][0].main.aqi,
        co: data["weather-list"][0].components.co,
        no: data["weather-list"][0].components.no,
        no2: data["weather-list"][0].components.no2,
        o3: data["weather-list"][0].components.o3,
        so2: data["weather-list"][0].components.so2,
        pm2_5: data["weather-list"][0].components.pm2_5,
        pm10: data["weather-list"][0].components.pm10,
        nh3: data["weather-list"][0].components.nh3,
      };
      setWeatherDataList([...weatherDataList, newWeatherData]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const resetData = () => {
    setCityName("");
    setWeatherDataList([]);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px">
      <label htmlFor="cityName">City Name: </label>
        <input type="text" placeholder="Enter City Name"  value={cityName} onChange={handleCityChange} />
        <Button colorScheme="blue" ml="2" onClick={fetchData}>
          Get Weather Data
        </Button>
        <Button colorScheme="red" ml="2" onClick={resetData}>
          Reset
        </Button>
      </Box>
      {weatherDataList.length > 0 && (
        <Table>
          <Thead>
            <Tr>
              <Th>City Name</Th>
              <Th>AQI</Th>
              <Th>CO</Th>
              <Th>NO</Th>
              <Th>NO2</Th>
              <Th>O3</Th>
              <Th>SO2</Th>
              <Th>PM2.5</Th>
              <Th>PM10</Th>
              <Th>NH3</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {weatherDataList.map((weatherData, index) => (
              <Tr key={index}>
                <Td>{weatherData.cityName}</Td>
                <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <div>{getQualitativeNamePollutants('AQI', weatherData.aqi)}</div>
                  <div>{weatherData.aqi}</div>
                </Td>
                              
                <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('CO', weatherData.co)}</div>
                <div>{weatherData.co} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('NO', weatherData.no)}</div>
                <div>{weatherData.no} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('NO2', weatherData.no2)}</div>
                <div>{weatherData.no2} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('O3', weatherData.o3)}</div>
                <div>{weatherData.o3} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('SO2', weatherData.so2)}</div>
                <div>{weatherData.so2} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('PM2.5', weatherData.pm2_5)}</div>
                <div>{weatherData.pm2_5} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('PM10', weatherData.pm10)}</div>
                <div>{weatherData.pm10} µg/m³</div>
              </Td>
              <Td style={{ padding: '0.5rem', textAlign: 'center' }}>
                <div>{getQualitativeNamePollutants('NH3', weatherData.nh3)}</div>
                <div>{weatherData.nh3} µg/m³</div>
              </Td>
                
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {weatherDataList.length > 0 && (
        <Box mt="4">
          <Button colorScheme="teal" onClick={handleRecommendationClick}>
            Health Recommendations
          </Button>
        </Box>
      )}

      <AlertDialog isOpen={showRecommendation} onClose={onCloseRecommendation}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            health advisories 
            </AlertDialogHeader>
            <AlertDialogBody>
              {/* Provide your health advisories or recommendations here based on the air quality data */}
              {/* You can use weatherDataList to access the current air quality data */}
               Recommendations:
              <ul>
                <li>Avoid outdoor activities if the air quality is "Poor" or "Very Poor".</li>
                <li>Use a mask when going outside in areas with high pollution.</li>
                {/* Add more recommendations as needed */}
              </ul>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onCloseRecommendation}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default WeatherInfo;
