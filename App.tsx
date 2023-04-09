/* eslint-disable prettier/prettier */
 /* eslint-disable no-trailing-spaces */
 /* eslint-disable prettier/prettier */

import React from 'react';
import "./src/config/firebaseConfig"
import { NativeBaseProvider} from 'native-base';
import  { Routes }  from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';;

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
