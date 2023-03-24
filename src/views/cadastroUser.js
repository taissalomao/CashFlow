/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from 'native-base';
import { NativeBaseProvider} from 'native-base';
import AppBar from '../components/nav';


function CadastroScreen ( ){
  return (
    <NativeBaseProvider>
      <AppBar />
      <View style={{ flex: 1, backgroundColor: '#EAF0F7', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text fontSize="lg" style={{marginBottom: 10 }}>Cadastro de usuário</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Nome"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Idade"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Nome de usuário"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Senha"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Confirme a senha"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="md" colorScheme="blue" style={{ marginBottom: 10 }}>Salvar</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroScreen;

