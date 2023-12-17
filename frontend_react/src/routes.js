import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import WeatherData from "views/admin/weatherdata";
import HistoricData from "views/admin/historicdata";
import AqiPollutant from "views/admin/aqipollutant";




const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Weather data",
    layout: "/admin",
    path: "/weatherdata",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: WeatherData,
    secondary: true,
  },
  {
    name: "AQI-Pollutants",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/aqi",
    component: AqiPollutant,
  },
  {
    name: "Historic Data",
    layout: "/admin",
    path: "/historicdata",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: HistoricData,
  },
  
];

export default routes;
