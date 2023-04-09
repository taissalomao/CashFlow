/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Button, Input, Select, Text} from 'native-base';
import { NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';


function CadastroReceitaScreen ( ){

const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: '#EAF0F7', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text fontSize="lg" style={{marginBottom: 10 }}>Cadastre a Receita</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Nome"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Descrição"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
            <Input variant="outline" placeholder="Valor R$"/>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 10 }}>
                <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Categoria">
                    <Select.Item label="Aluguel" value="Aluguel" />
                    <Select.Item label="Água" value="Água" />
                    <Select.Item label="Luz" value="Luz" />
                    <Select.Item label="Telefone" value="Telefone" />
                    <Select.Item label="Internet" value="Internet" />
                </Select>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
            <Button size="md" colorScheme="blue" style={{ marginBottom: 10 }}>Salvar</Button>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20}}>
            <Button size="md" colorScheme="blue" style={{ marginBottom: 10 }}
            onPress={()=>{navigation.navigate('Receitas');}}>Minhas Receitas</Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroReceitaScreen;
