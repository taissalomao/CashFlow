/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Select, Text} from 'native-base';
import {NativeBaseProvider} from 'native-base';
import {useNavigation } from '@react-navigation/native';
import {set, ref} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import {database} from '../config/firebaseConfig';

function CadastroReceitaScreen() {
  const navigation = useNavigation();


  const [receita, setReceita] = useState({nome: '', descricao: '', valor: '', categoria: ''});
  const auth = getAuth();
  async function handleRegister() {
    try {
      await (auth, receita.nome, receita.descricao, receita.valor, receita.categoria).then(
        async result => {
          set(ref(database, `receita/${result.receita.uid}`), receita);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider>
      <View style={styles.containerPai}>
        <View style={styles.containerFilho}>
          <View style={styles.content} >
            <Text style={styles.texto}>Cadastro de Receita</Text>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Nome" onChangeText={e => setReceita({...receita, nome: e})} />
            </View>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Descrição" onChangeText={e => setReceita({...receita, descricao: e})} />
            </View>
            <View
              style={styles.inputs}>
              <Input variant="outline" placeholder="Valor R$" onChangeText={e => setReceita({...receita, valor: e})} />
            </View>
            <View
              style={styles.inputs}>
              <Select
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Categoria" onChangeText={e => setReceita({...receita, categoria: e})}>
                <Select.Item label="Aluguel" value="Aluguel" />
                <Select.Item label="Água" value="Água" />
                <Select.Item label="Luz" value="Luz" />
                <Select.Item label="Telefone" value="Telefone" />
                <Select.Item label="Internet" value="Internet" />
              </Select>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20, marginTop: 20}}>
              <Button size="md" colorScheme="blue" style={styles.saveButton} onPress={() => handleRegister()}>
              <Text styles={styles.textSaveButton}>Salvar</Text>
              </Button>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <Button
                size="md"
                colorScheme="blue"
                style={styles.saveButton}
                onPress={() => {
                  navigation.navigate('Receitas');
                }}>
                <Text styles={styles.textSaveButton}>Minhas Receitas</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default CadastroReceitaScreen;

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
    color: 'blue',
    fontWeight: 'bold',
  },
});
