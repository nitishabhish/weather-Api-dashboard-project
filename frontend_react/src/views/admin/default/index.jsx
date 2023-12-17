import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactApexChart from "react-apexcharts";
// Import ApexCharts components for the pie chart
import ReactApexPieChart from "react-apexcharts";

const WeatherChart = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [inputCityName, setInputCityName] = useState("");
  const [cityName, setCityName] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const fetchData = () => {
    setCityName(inputCityName);
    const apiUrl = "http://127.0.0.1:8000/weather/historic";
    const startTimestamp = Math.floor(startDateTime.getTime() / 1000);
    const endTimestamp = Math.floor(endDateTime.getTime() / 1000);

    axios
      .get(apiUrl, {
        params: {
          city_name: inputCityName,
          start: startTimestamp,
          end: endTimestamp,
        },
      })
      .then((response) => {
        setWeatherList(response.data["weather-list"]);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };


  const handleCityNameChange = (e) => {
    setInputCityName(e.target.value);
  };

  

  const chartData = {
    options: {
      chart: {
        type: "line",
        background: "#808080", // Change this to your dark background color
      },
      xaxis: {
        type: "category",
        categories: weatherList.map((weather) =>
          new Date(weather.dt * 1000).toLocaleString()
        ),
      },
      colors: Object.keys(weatherList[0]?.components || {}).map(() => getRandomColor()),
      dataLabels: {
        style: {
          colors: ["white"], // Set the font color for data labels as an array
        },
      },
    },
    series: Object.keys(weatherList[0]?.components || {}).map((componentName) => ({
      name: componentName,
      data: weatherList.map((weather) => weather.components?.[componentName] || 0),
    })),
  };
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  const componentColors = {
    "co": "#FF5733",
    "no": "#33FF57",
    "no2": "#5733FF",
    "o3": "#FF3366",
    "so2": "#33FFC2",
    "pm2_5": "#FFD633",
    "pm10": "#CC33FF",
    "nh3": "#33A2FF",
  };
  
  const componentOrder = [
    { name: "co", color: "#FF5733" },
    { name: "no", color: "#33FF57" },
    { name: "no2", color: "#5733FF" },
    { name: "o3", color: "#5733FF" },
    { name: "so2", color: "#5733FF" },
    { name: "pm2_5", color: "#FFD633" },
    { name: "pm10", color: "#CC33FF" },
    { name: "nh3", color: "#33A2FF" },
    // Define colors for all desired components here
  ];
  
  const barChartData = {
    options: {
      chart: {
        type: "bar",
        background: "#808080",
      },
      plotOptions: {
        bar: {
          columnWidth: "130%", // Adjust the column width here
          distributed: true, // Spread bars evenly
        },
      },
      xaxis: {
        type: "category",
        categories: weatherList.map((weather) =>
          new Date(weather.dt * 1000).toLocaleString()
        ),
        labels: {
          rotate: -45,
          formatter: function (val, timestamp) {
            return new Date(timestamp).toLocaleString();
          },
        },
      },
      colors: componentOrder.map(component => component.color),
      dataLabels: {
        style: {
          colors: ["white"],
        },
      },
    },
    series: componentOrder.map((component, index) => ({
      name: component.name,
      data: weatherList.map((weather) => weather.components?.[component.name] || 0),
      color: componentOrder[index].color,
    })),
  };
  
// Pie Chart Data
const pieChartData = {
  options: {
    labels: Object.keys(weatherList[0]?.components || {}),
    colors: Object.values(componentColors),
    legend: {
      position: "bottom",
      labels: {
        colors: ["white"], // Set the font color for the legend labels
      },
    },
  },
  series: Object.keys(weatherList[0]?.components || {}).map((componentName) =>
    weatherList.reduce((sum, weather) => sum + (weather.components?.[componentName] || 0), 0)
  ),
};

  return (
    <Box p={4}>
      <Stack spacing={4} mb={4}>
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
            Get Weather Data
          </Button>

          <Button colorScheme="gray" onClick={() => setWeatherList([])} size="sm">
            Reset
          </Button>
        </Flex>
      </Stack>

      {weatherList.length > 0 && (
        <Box>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
          />
          {/* Bar Chart */}
          <ReactApexChart
            options={barChartData.options}
            series={barChartData.series}
            type="bar"
          />
          {/* Pie Chart */}
          <ReactApexPieChart
            options={pieChartData.options}
            series={pieChartData.series}
            type="donut"
          />
        </Box>
      )}
    </Box>
  );
};

export default WeatherChart;