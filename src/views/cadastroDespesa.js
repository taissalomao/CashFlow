/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Select, Text, Button} from 'native-base';
import { NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';


function CadastroDespesaScreen (){

  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={styles.containerPai}>
        <View style={styles.containerFilho}>
          <View style={styles.content} >
            <Text style={styles.texto}>Cadastro de Despesa</Text>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Nome" />
            </View>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Descrição"/>
            </View>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Valor R$"/>
            </View>
            <View
              style={styles.inputs}>
              <Select
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Categoria">
                <Select.Item label="Aluguel" value="Aluguel" />
                <Select.Item label="Água" value="Água" />
                <Select.Item label="Luz" value="Luz" />
                <Select.Item label="Telefone" value="Telefone" />
                <Select.Item label="Internet" value="Internet" />
              </Select>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20, marginTop: 20}}>
              <Button size="md" colorScheme="blue" styles={styles.saveButton} >
              <Text styles={styles.textSaveButton}>Salvar</Text>
              </Button>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <Button
                size="md"
                colorScheme="blue"
                styles={styles.saveButton}
                onPress={() => {
                  navigation.navigate('Despesas');
                }}>
                <Text styles={styles.textSaveButton}>Minhas Despesas</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroDespesaScreen;

const styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    backgroundColor: '#EAF0F7',
    justifyContent: 'flex-start',
  },
  containerFilho: {
    flex: 0.3,
    backgroundColor: 'blue',
    paddingTop: 70,
  },
  inputs: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    padding: 10,
    height: 500,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#79d6f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  textSaveButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
