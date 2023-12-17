import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const WeatherApp = () => {
  const { colorMode } = useColorMode();
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const inputTextColor = colorMode === "dark" ? "white" : "black";

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/weather/weather_data?city_name=${cityName}`);
      const data = await response.json();
      setWeatherData((prevData) => [...prevData, { city: cityName, ...data }]);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
    }
  };

  const resetWeatherData = () => {
    setWeatherData([]);
    setError(null);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex direction="column" align="center">
        <Text color={textColor} fontSize="2xl" fontWeight="700" mb="4">
          Weather App
        </Text>
        <Flex direction="column" align="center" maxW="400px" mx="auto">
          <Input
            placeholder="Enter city name"
            value={cityName}
            onChange={handleCityNameChange}
            mb="4"
            color={inputTextColor}
          />
          <Button colorScheme="teal" onClick={fetchWeatherData}>
            Get Weather
          </Button>
          <Button colorScheme="gray" variant="outline" onClick={resetWeatherData} mt="2">
            Reset
          </Button>
          {error && (
            <Text color="red.500" mt="4" textAlign="center">
              {error}
            </Text>
          )}
          {weatherData.length > 0 && (
            <Box mt="4">
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>City</Th>
                    <Th>Description</Th>
                    <Th>Temperature (°C)</Th>
                    <Th>Wind Speed (m/s)</Th>
                    <Th>Humidity (%)</Th>
                    <Th>Visibility (m)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {weatherData.map((data, index) => (
                    <Tr key={index}>
                      <Td>{data.city}</Td>
                      <Td>{data.description}</Td>
                      <Td>{data.temp}</Td>
                      <Td>{data.wind_speed}</Td>
                      <Td>{data.humidity}</Td>
                      <Td>{data.visibility}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default WeatherApp;
