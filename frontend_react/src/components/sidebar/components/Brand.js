import React from "react";

// Chakra imports
import {Text, Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text fontSize='xl' fontWeight='bold' color={logoColor}>
        Weather Reports
      </Text>
      <HSeparator mb='50px' />
    </Flex>
  );
}

export default SidebarBrand;
