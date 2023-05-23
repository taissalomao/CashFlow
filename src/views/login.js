/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, Input } from 'native-base';
import { NativeBaseProvider, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, User } from "firebase/auth/react-native";
//import Sidebar from '../components/sidebar';
//import AppBar from '../components/nav';
import { Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';


function LoginScreen() {
  const [user, setUser] = useState({email:"", senha:""});
  const authFirebase = getAuth();

  async function login() {
    if (user.email === "" || user.senha === "") {
      console.log("vazios")
      return;
    }
    try {
      await signInWithEmailAndPassword(
        authFirebase,
        user.email,
        user.senha
      ).then(res=>{
        navigation.navigate('Home')
      });
    } catch (error) {
      console.log(error)
    }
  }


  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View style={{ backgroundColor: '#EAF0F7', justifyContent: 'center', flex: 1 }}>
        <View stlye={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/images/logo.png')} style={{ width: 120, height: 130, alignSelf: 'center' }} />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="underlined" placeholder="Email" onChangeText={(e) => setUser({...user, email: e})} />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="underlined" placeholder="Senha" onChangeText={(e) => setUser({...user, senha: e})} />
            <Text style={{ textAlign: 'right', marginTop: 5 }}>
              <Link style={{ color: 'grey' }} onPress={() => { navigation.navigate('Cadastro'); }} >Cadastre-se aqui</Link>
            </Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="lg" borderRadius={16} onPress={()=>{navigation.navigate('Home');}} colorScheme="blue" style={{ marginBottom: 10 }}>Login</Button>
            <Button size="lg" style={{ marginBottom: 10, borderRadius: 16 }}>Login com Google</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default LoginScreen;


