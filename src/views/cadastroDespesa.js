/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Input,
  Text,
  NativeBaseProvider,
  FormControl,
  Box,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import {useAuthentication} from '../utils/authenticator';

const CadastroDespesaScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [nomeDespesa, setNomeDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [descricaoDespesa, setDescricaoDespesa] = useState('');
  const [categoriaDespesa, setCategoriaDespesa] = useState('');
  const [dataDespesa, setDataDespesa] = useState('');
  const [isDateFocused, setIsDateFocused] = useState(false);

  const formatarData = (data) => {
    const numericData = data.replace(/[^\d]/g, '');
    let formattedData = '';

    if (numericData.length > 2) {
      formattedData += numericData.substr(0, 2) + '/';
    }
    if (numericData.length > 4) {
      formattedData += numericData.substr(2, 2) + '/';
    }
    if (numericData.length > 6) {
      formattedData += numericData.substr(4, 4);
    }

    return formattedData;
  };

  const handleAddExpense = async () => {
    try {
      const expensesRef = collection(db, 'user', user?.uid, 'despesas');
      await addDoc(expensesRef, {
        nome: nomeDespesa,
        valor: parseFloat(valorDespesa),
        descricao: descricaoDespesa,
        categoria: categoriaDespesa,
        data: dataDespesa,
      });

      navigation.navigate('Despesas');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateFocus = () => {
    setIsDateFocused(true);
  };

  const handleDateBlur = () => {
    setIsDateFocused(false);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.teste}>Cadastre a Despesa</Text>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Nome:
          </FormControl.Label>
          <Input
            variant="outline"
            value={nomeDespesa}
            onChangeText={setNomeDespesa}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Descrição:
          </FormControl.Label>
          <Input
            variant="outline"
            value={descricaoDespesa}
            onChangeText={setDescricaoDespesa}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Valor:
          </FormControl.Label>
          <Input
            variant="outline"
            value={valorDespesa}
            onChangeText={setValorDespesa}
            keyboardType="numeric"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Categoria:
          </FormControl.Label>
          <Input
            variant="outline"
            value={categoriaDespesa}
            onChangeText={setCategoriaDespesa}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Data:
          </FormControl.Label>
          <Input
            variant="outline"
            value={formatarData(dataDespesa)}
            onChangeText={setDataDespesa}
            placeholder="DD/MM/YYYY"
            keyboardType="numeric"
            paddingLeft={2}
            paddingRight={2}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
          />
        </FormControl>

        <Button style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.addButtonText}>Adicionar Despesa</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#EAF0F7',
  },
  teste: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#79d6f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  addButtonText: {
    color: '#1348cf',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CadastroDespesaScreen;
