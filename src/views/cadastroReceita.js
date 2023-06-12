/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, NativeBaseProvider, FormControl, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getDocs, doc, query } from 'firebase/firestore';
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
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [dataReceita, setDataReceita] = useState('');
  const [isDateFocused, setIsDateFocused] = useState(false);

  useEffect(() => {
    carregarCategoriasReceitas();
  }, []);

  const carregarCategoriasReceitas = async () => {
    try {
      const userDocRef = doc(db, 'user', user.uid);
      const categoriasRef = collection(userDocRef, 'categoriasReceitas');
      const q = query(categoriasRef);
      const categoriasSnapshot = await getDocs(q);
      const categoriasData = [];
      categoriasSnapshot.forEach((doc) => categoriasData.push(doc.data()));
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
      const categoriasRef = collection(db, 'user', user.uid, 'categoriasReceitas');
      await addDoc(categoriasRef, { nome: novaCategoria });
      setNovaCategoria('');
      carregarCategoriasReceitas()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cadastre a Receita</Text>
        </View>

        <View style={styles.form}>
          <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              Nome:
            </FormControl.Label>
            <Input
              variant="outline"
              value={nomeReceita}
              onChangeText={setNomeReceita}
              style={styles.input}
            />
          </FormControl>

{/*           <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              Descrição:
            </FormControl.Label>
            <Input
              variant="outline"
              value={descricaoReceita}
              onChangeText={setDescricaoReceita}
              style={styles.input}
            />
          </FormControl> */}

          <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              Valor:
            </FormControl.Label>
            <Input
              variant="outline"
              value={valorReceita}
              onChangeText={setValorReceita}
              keyboardType="numeric"
              style={styles.input}
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
                <Select.Item
                  key={categoria.nome}
                  value={categoria.nome}
                  label={categoria.nome}
                />
              ))}
            </Select>
            {!mostrarNovaCategoria && (
              <Button onPress={() => setMostrarNovaCategoria(true)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar Nova Categoria</Text>
              </Button>
            )}
            {mostrarNovaCategoria && (
              <Input
                variant="outline"
                value={novaCategoria}
                onChangeText={setNovaCategoria}
                placeholder="Nova categoria"
                style={styles.input}
              />
            )}
            {mostrarNovaCategoria && (
              <Button onPress={handleNovaCategoriaReceita} style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar Categoria</Text>
              </Button>
            )}
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
              style={styles.input}
            />
          </FormControl>

          <Button onPress={handleAddRevenue} style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar Receita</Text>
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
  },
  header: {
    backgroundColor: '#66CDAA',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    marginBottom: 8,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#66CDAA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroReceitaScreen;
