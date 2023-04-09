/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import AppBar from '../components/nav';


function CadastroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  async function handleRegister() {
    console.log(email)
    console.log(password)
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <NativeBaseProvider>
      <AppBar />
      <View style={{ flex: 1, backgroundColor: '#EAF0F7', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text fontSize="lg" style={{ marginBottom: 10 }}>Cadastro de usuário</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
       {/*    <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Nome" />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Idade" />
          </View> */}
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Email" onChangeText={(e)=>setEmail(e)}  />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Senha" onChangeText={(e)=>setPassword(e)} />
          </View>
          {/* <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Confirme a senha" />
          </View> */}
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="md" colorScheme="blue" style={{ marginBottom: 10 }} onPress={()=> handleRegister()}>Salvar</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroScreen;

