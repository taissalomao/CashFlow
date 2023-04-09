/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const expenses = [
  { id: '1', title: 'Salário', amount: 5000.00 },
  { id: '2', title: 'Investimento', amount: 2000.00 },
  { id: '3', title: 'Apto Alugado', amount: 800.00 },
  { id: '14', title: 'Pensão', amount: 1500.00 },
];

const ListagemReceitaScreen = () => {

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
        <Text>Lista de receitas</Text>
        <Text>Total receitas: R$ 2000,00</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.expenseListContainer}>
          <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.topSection}>
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate('CadastroReceita');}}>
              <Text style={styles.addButtonText}>Adicionar receita</Text>
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

export default ListagemReceitaScreen;
