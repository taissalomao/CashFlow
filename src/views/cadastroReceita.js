/* eslint-disable no-unused-vars *//* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, NativeBaseProvider, FormControl, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';

const CadastroReceitaScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [nomeReceita, setNomeReceita] = useState('');
  const [valorReceita, setValorReceita] = useState('');
  const [descricaoReceita, setDescricaoReceita] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaReceita, setCategoriaReceita] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [dataReceita, setDataReceita] = useState('');
  const [isDateFocused, setIsDateFocused] = useState(false);

  useEffect(() => {
    carregarCategoriasReceitas();
  }, []);

  const carregarCategoriasReceitas = async () => {
    try {
      const categoriasRef = collection(db, 'categoriasReceitas'); // Altere 'categorias' para o nome da sua coleção no banco de dados
      const categoriasSnapshot = await getDocs(categoriasRef);
      const categoriasData = categoriasSnapshot.docs.map((doc) => doc.data());
      setCategorias(categoriasData);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleAddRevenue = async () => {
    try {
      const revenueRef = collection(db, 'user', user?.uid, 'receitas');
      await addDoc(revenueRef, {
        nome: nomeReceita,
        valor: parseFloat(valorReceita),
        descricao: descricaoReceita,
        categoria: categoriaReceita,
        data: dataReceita,
      });

      navigation.navigate('Receitas');
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

  const handleNovaCategoriaReceita = async () => {
    try {
      const categoriasRef = collection(db, 'categoriasReceitas'); // Altere 'categorias' para o nome da sua coleção no banco de dados
      await addDoc(categoriasRef, { nome: novaCategoria });
      setNovaCategoria('');
      carregarCategoriasReceitas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.teste}>Cadastre a Receita</Text>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Nome:
          </FormControl.Label>
          <Input
            variant="outline"
            value={nomeReceita}
            onChangeText={setNomeReceita}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Descrição:
          </FormControl.Label>
          <Input
            variant="outline"
            value={descricaoReceita}
            onChangeText={setDescricaoReceita}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Valor:
          </FormControl.Label>
          <Input
            variant="outline"
            value={valorReceita}
            onChangeText={setValorReceita}
            keyboardType="numeric"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Categoria:
          </FormControl.Label>
          <Select
            placeholder="Selecione uma categoria"
            selectedValue={categoriaReceita}
            minWidth={200}
            accessibilityLabel="Selecione a categoria da Receita"
            onValueChange={(value) => setCategoriaReceita(value)}
          >
            {categorias.map((categoria) => (
              <Select.Item key={categoria.nome} value={categoria.nome} label={categoria.nome} />
            ))}
          </Select>
          <Input
            variant="outline"
            value={novaCategoria}
            onChangeText={setNovaCategoria}
            placeholder="Nova categoria"
          />
          <Button onPress={handleNovaCategoriaReceita}>Adicionar Categoria</Button>
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
            Data:
          </FormControl.Label>
          <Input
            variant="outline"
            value={formatarData(dataReceita)}
            onChangeText={setDataReceita}
            placeholder="DD/MM/YYYY"
            keyboardType="numeric"
            paddingLeft={2}
            paddingRight={2}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
          />
        </FormControl>

        <Button style={styles.addButton} onPress={handleAddRevenue}>
          <Text style={styles.addButtonText}>Adicionar Receita</Text>
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

export default CadastroReceitaScreen;
