/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation();

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>R$ {item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <>
      <View style={{backgroundColor: 'blue', height: 80}}>
        <Text>Lista de despesas</Text>
        <Text>Total despesas: R$ 2000,00</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.expenseListContainer}>
          <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.topSection}>
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate('CadastroDespesa');}}>
              <Text style={styles.addButtonText}>Adicionar despesa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 32,
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#79d6f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 60,
  },
  addButtonText: {
    color: '#1348cf',
    fontWeight: 'bold',
  },
  expenseListContainer: {
    flex: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expenseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  expenseAmount: {
    fontSize: 14,
    color: 'black',
  },
});

export default ListagemDespesaScreen;
