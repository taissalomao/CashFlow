/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetalhesDespesaScreen = ({ route, navigation }) => {
  const { despesa } = route.params;

  const handleDelete = () => {
    // Aqui você pode adicionar a lógica para excluir a despesa do banco de dados
    // Após a exclusão, você pode navegar de volta para a tela de listagem de despesas
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.expenseTitle}>{despesa.nome}</Text>
      <Text style={styles.expenseAmount}>R$ {despesa.valor.toFixed(2)}</Text>
      <Text style={styles.expenseAmount}>R$ {despesa.descricao}</Text>
    <Text style={styles.expenseAmount}>R$ {despesa.categoria}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    padding: 16,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expenseAmount: {
    fontSize: 16,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetalhesDespesaScreen;
