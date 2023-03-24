/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from 'native-base';
import { NativeBaseProvider, Link} from 'native-base';
//import Sidebar from '../components/sidebar';
import AppBar from '../components/nav';
//import { Image } from 'react-native';


function LoginScreen() {
  return (
    <NativeBaseProvider>
      <AppBar />
      <View style={{ flex: 1, backgroundColor: '#EAF0F7', justifyContent: 'center' }}>
{/*         <View >
          <Image source={require('../assets/images/logo.pnh')} style={{width: 120, height: 130}}/>
        </View> */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="underlined" placeholder="Email" />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="underlined" placeholder="Senha" />
            <Text style={{ textAlign: 'right', marginTop: 5 }}>
              <Link href="/cadastroUser" style={{ color: 'grey' }}>Cadastre-se aqui</Link>
            </Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="lg" colorScheme="blue" style={{ marginBottom: 10 }}>Login</Button>
            <Button size="lg" style={{ marginBottom: 10 }}>Login com Google</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default LoginScreen;


