/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native';
//import LoginScreen from './src/components/login';
import { NativeBaseProvider} from 'native-base';
import LoginScreen from './src/views/login';
import  { Routes }  from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';
//import CadastroScreen from './src/views/cadastroUser';
//import CadastroDespesaScreen from './src/views/cadastroDespesa';
//import ListaDespesasScreen from './src/views/listaDespesas';

function App() {
 

  return (


    <NativeBaseProvider>  
      <NavigationContainer>
          <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}

export default App;
