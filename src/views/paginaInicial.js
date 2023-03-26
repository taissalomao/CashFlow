/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */

import { View, Text } from 'react-native';
import { Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginScreen from './login';
import { NativeBaseProvider } from 'native-base';

function InitialScreen() {
  const DELAY_TIME = 3000; // 3 segundos

  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldNavigate(true);
    }, DELAY_TIME);

    return () => clearTimeout(timeoutId);
  }, []);

  if (shouldNavigate) {
    return <LoginScreen/>;
  }

  return (
    <NativeBaseProvider>
      <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/images/logo.png')} style={{width: 120, height: 130}}/>
        <Text style={{ color: 'grey' }}>CashFlow</Text>
      </View>
    </NativeBaseProvider>
  );
}

export default InitialScreen;
