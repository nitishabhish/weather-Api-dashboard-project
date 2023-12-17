import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_URLS from '../../.././config';
const WeatherTable = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [error, setError] = useState(null);
  const [inputCityName, setInputCityName] = useState(""); // Separate state for input
  const [cityName, setCityName] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const fetchData = () => {
    // Set the cityName state when the user presses the "Get Weather Data" button
    setCityName(inputCityName);

    // Define the API endpoint with city name, start, and end dates
    const apiUrl = `${API_URLS.BASE_URL}/historic`;

    // Convert start and end date to timestamps
    const startTimestamp = Math.floor(startDateTime.getTime() / 1000);
    const endTimestamp = Math.floor(endDateTime.getTime() / 1000);

    // Make the API request
    axios
      .get(apiUrl, {
        params: {
          city_name: inputCityName, // Use the inputCityName for the API request
          start: startTimestamp,
          end: endTimestamp,
        },
      })
      .then((response) => {
        // Update the state with the received data
        setWeatherList(response.data["weather-list"]); // Check the response structure
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again later.");
      });
  };

  const handleCityNameChange = (e) => {
    // Update the inputCityName state while typing
    setInputCityName(e.target.value);
  };

  const handleReset = () => {
    // Reset all fields and data
    setInputCityName("");
    setCityName("");
    setStartDateTime(new Date());
    setEndDateTime(new Date());
    setWeatherList([]);
    setError(null);
  };

  return (
    <Box p={4}>
      <Stack spacing={4} mb={4} mt ={8}>
        <FormControl mb={4}>
          <FormLabel>City Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter city name"
            value={inputCityName}
            onChange={handleCityNameChange}
            color="white"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Start Date and Time</FormLabel>
          <DatePicker
            selected={startDateTime}
            onChange={(date) => setStartDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>End Date and Time</FormLabel>
          <DatePicker
            selected={endDateTime}
            onChange={(date) => setEndDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </FormControl>

        <Flex justify="space-between">
          <Button colorScheme="teal" onClick={fetchData} size="sm">
            Get Historic Data
          </Button>

          <Button colorScheme="gray" onClick={handleReset} size="sm">
            Reset
          </Button>
        </Flex>
      </Stack>

      {weatherList.length > 0 && (
        <Table variant="simple">
          <TableCaption placement="top">
            Historic Weather Data for {cityName} from {startDateTime.toLocaleString()} to{" "}
            {endDateTime.toLocaleString()}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Date and Time</Th>
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
            {weatherList.map((weather) => (
              <Tr key={weather.dt}>
                <Td>{new Date(weather.dt * 1000).toLocaleString()}</Td>
                <Td>{weather.main.aqi}</Td>
                <Td>{weather.components.co}</Td>
                <Td>{weather.components.no}</Td>
                <Td>{weather.components.no2}</Td>
                <Td>{weather.components.o3}</Td>
                <Td>{weather.components.so2}</Td>
                <Td>{weather.components.pm2_5}</Td>
                <Td>{weather.components.pm10}</Td>
                <Td>{weather.components.nh3}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default WeatherTable;
