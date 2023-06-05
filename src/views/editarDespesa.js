/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';

const EditarDespesaScreen = ({ route, navigation }) => {
  const { despesa } = route.params || {};

  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const { user } = useAuthentication();

  useEffect(() => {
    if (despesa) {
      setNome(despesa.nome);
      setValor(despesa.valor.toString());
    }
  }, [despesa]);

  const handleSave = async () => {
    try {
      const expenseRef = doc(db, 'user', user?.uid, 'despesas', despesa.id);
      await updateDoc(expenseRef, {
        nome: nome,
        valor: parseFloat(valor),
      });
      const updatedDespesa = {
        ...despesa,
        nome: nome,
        valor: parseFloat(valor),
      };
      navigation.navigate('Despesas', { despesa: updatedDespesa }); // Navega para a tela de listagem com a despesa atualizada
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {despesa && despesa.nome ? (
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
