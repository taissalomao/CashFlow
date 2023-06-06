/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthentication } from '../utils/authenticator';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const EditarDespesaScreen = ({ route, navigation }) => {
  const { despesa } = route.params || {};

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const { user } = useAuthentication();

  useEffect(() => {
    if (despesa) {
      setNome(despesa.nome);
      setValor(despesa.valor.toString());
      setDescricao(despesa.descricao);
      setCategoria(despesa.categoria);
      setData(despesa.data);
    }
  }, [despesa]);

  const handleSave = async () => {
    try {
      const expenseRef = doc(db, 'user', user?.uid, 'despesas', despesa.id);
      await updateDoc(expenseRef, {
        nome: nome,
        valor: parseFloat(valor),
        descricao: descricao,
        categoria: categoria,
        data: data,
      });
      const updatedDespesa = {
        ...despesa,
        nome: nome,
        valor: parseFloat(valor),
        descricao: descricao,
        categoria: categoria,
        data: data,
      };
      navigation.navigate('Despesas', { despesa: updatedDespesa });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {despesa ? (
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
        <Text>Não foi possível carregar os detalhes da despesa.</Text>
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default EditarDespesaScreen;
