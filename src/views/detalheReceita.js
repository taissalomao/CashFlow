/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthentication } from '../utils/authenticator';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
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
      const revenueRef = doc(db, 'user', user?.uid, 'receita', receita.id);
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
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Categoria:</Text>
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={styles.label}>Data:</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Nenhuma receita selecionada para edição</Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditarReceitaScreen;
