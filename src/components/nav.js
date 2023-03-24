/* eslint-disable prettier/prettier */

import React from 'react';
import {StatusBar, Box, HStack, Text} from 'native-base';
/* import {CheckIcon } from 'native-base'; */


function AppBar() {
    return (
      <>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="violet.600" />
        <HStack bg="blue.300" px="1" py="3" justifyContent="center" alignItems="center" w="100%">
          <HStack alignItems="center" justifyContent="space-between">
            <Text color="white" fontSize="20" fontWeight="bold">
              CashFlow
            </Text>
            {/* <CheckIcon size="5" mt="0.5" color="emerald.500" /> */}
          </HStack>
        </HStack>
      </>
    );
  }
export default AppBar;
