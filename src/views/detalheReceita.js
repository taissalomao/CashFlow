/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthentication } from '../utils/authenticator';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const EditarReceitaScreen = ({ route, navigation }) => {
  const { receita } = route.params || {};

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const { user } = useAuthentication();

  useEffect(() => {
    if (receita) {
      setNome(receita.nome);
      setValor(receita.valor.toString());
      setDescricao(receita.descricao);
      setCategoria(receita.categoria);
      setData(receita.data);
    }
  }, [receita]);

  const handleSave = async () => {
    try {
      const revenueRef = doc(db, 'user', user?.uid, 'receitas', receita.id);
      await updateDoc(revenueRef, {
        nome: nome,
        valor: parseFloat(valor),
        descricao: descricao,
        categoria: categoria,
        data: data,
      });
      const updatedReceita = {
        ...receita,
        nome: nome,
        valor: parseFloat(valor),
        descricao: descricao,
        categoria: categoria,
        data: data,
      };
      navigation.navigate('Receitas', { receita: updatedReceita });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {receita ? (
        <>
          <Text style={[styles.label, { color: '#4F4F4F' }]}>Nome:</Text>
          <TextInput
            style={[styles.input, { color: '#A9A9A9' }]}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={[styles.label, { color: '#4F4F4F' }]}>Valor:</Text>
          <TextInput
            style={[styles.input, { color: '#A9A9A9' }]}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: '#4F4F4F' }]}>Descrição:</Text>
          <TextInput
            style={[styles.input, { color: '#A9A9A9' }]}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={[styles.label, { color: '#4F4F4F' }]}>Categoria:</Text>
          <TextInput
            style={[styles.input, { color: '#A9A9A9' }]}
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={[styles.label, { color: '#4F4F4F' }]}>Data:</Text>
          <TextInput
            style={[styles.input, { color: '#A9A9A9' }]}
            value={data}
            onChangeText={setData}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={[styles.saveButtonText, { color: '#4F4F4F' }]}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ color: '#4F4F4F' }}>Não foi possível carregar os detalhes da receita.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4F4F4F',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: '#A9A9A9',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
});

export default EditarReceitaScreen;
