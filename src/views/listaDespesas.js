/* eslint-disable prettier/prettier */
import { background } from '@chakra-ui/react';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const expenses = [
  { id: '1', title: 'Compras do mês', amount: 200.00 },
  { id: '2', title: 'Conta de luz', amount: 80.00 },
  { id: '3', title: 'Combustível', amount: 60.00 },
  { id: '4', title: 'Manutenção do carro', amount: 150.00 },
  { id: '5', title: 'Assinatura da academia', amount: 80.00 },
  { id: '6', title: 'Aluguel', amount: 1000.00 },
  { id: '7', title: 'Manutenção do carro', amount: 150.00 },
  { id: '8', title: 'Assinatura da academia', amount: 80.00 },
  { id: '9', title: 'Aluguel', amount: 1000.00 },
  { id: '10', title: 'Globoplay', amount: 50.00 },
  { id: '11', title: 'Netflix', amount: 30.00 },
  { id: '12', title: 'Fone', amount: 20.00 },
  { id: '13', title: 'Peça de carro', amount: 80.00 },
  { id: '14', title: 'Ifood', amount: 20.00 },
];

const ListagemDespesaScreen = () => {
  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>R$ {item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={{backgroundColor: '#b4d4db'}}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseAmount: {
    fontSize: 18,
  },
});

export default ListagemDespesaScreen;
