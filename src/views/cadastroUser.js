/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from 'native-base';
import { NativeBaseProvider} from 'native-base';
import AppBar from '../components/nav';
import {set, ref} from "firebase/database"
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { database, db } from '../config/firebaseConfig';


function CadastroScreen ( ){
  const [user, setUser] = useState({nome: "", email:"", senha:""});
  const auth = getAuth();
  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.senha).then(async (result) => {
        set(ref(database, `user/${result.user.uid}`), user)
        
      });

     
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <NativeBaseProvider>
      <AppBar />
      <View style={{ flex: 1, backgroundColor: '#EAF0F7', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text fontSize="lg" style={{marginBottom: 10 }}>Cadastro de usuário</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Nome" onChangeText={(e) => setUser({...user, nome: e})} />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Email" onChangeText={(e) => setUser({...user, email: e})} />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Senha" onChangeText={(e) => setUser({...user, senha: e})}  />
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Confirme a senha"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="md" colorScheme="blue" style={{ marginBottom: 10 }} onPress={() => handleRegister()}>Salvar</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroScreen;

