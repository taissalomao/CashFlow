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
//import CadastroScreen from './src/views/cadastroUser';
//import CadastroDespesaScreen from './src/views/cadastroDespesa';
//import ListaDespesasScreen from './src/views/listaDespesas';

function App() {
  const DELAY_TIME = 5000; // 5 segundos

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
          <Image source={require('./src/assets/images/logo.png')} style={{width: 120, height: 130}}/>
        </View>
    </NativeBaseProvider>

  );
}

export default App;
