/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';
import { doc } from 'firebase/firestore';
import { NativeBaseProvider, Button } from 'native-base';

const ListagemDespesaScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null); // Variável para armazenar a despesa selecionada
  const navigation = useNavigation();
  const { user } = useAuthentication();

  useEffect(() => {
    const fetchExpenses = async () => {
      console.log('User:', user);
      console.log('User ID:', user?.uid);

      try {
        const userDocRef = doc(db, 'user', user?.uid);
        const expensesRef = collection(userDocRef, 'despesas');
        const q = query(expensesRef);
        const querySnapshot = await getDocs(q);
        const expenseList = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
          const expense = { id: doc.id, ...doc.data() };
          expenseList.push(expense);
          total += expense.valor;
        });
        console.log('Expense List:', expenseList);
        setExpenses(expenseList);
        setTotalDespesas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, [user, user?.uid]);

  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    if (expenseToEdit) {
      navigation.navigate('EditarDespesa', { despesa: expenseToEdit }); // Adicionado este trecho
    }
  };



  const handleDeleteExpense = async (expenseId) => {
    if (selectedExpense) {
      try {
        await deleteDoc(doc(db, 'user', user?.uid, 'despesas', expenseId));
        console.log('Despesa excluída:', expenseId);
        // Atualize a lista de despesas após excluir
        const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
        setExpenses(updatedExpenses);
        setSelectedExpense(null); // Limpar a despesa selecionada após excluir
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderExpenseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => setSelectedExpense(item)} // Defina a despesa selecionada quando o item for pressionado
    >
      <Text style={styles.expenseTitle}>{item.nome}</Text>
      <Text style={styles.expenseAmount}>R$ {item.valor.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.totalDespesas}>Total de Despesas: R$ {totalDespesas.toFixed(2)}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.expenseListContainer}>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}
            ListEmptyComponent={<Text>Nenhuma despesa encontrada</Text>}
          />
          <View style={styles.topSection}>
            <Button
              style={styles.addButton}
              onPress={() => {
                navigation.navigate('CadastroDespesa');
              }}
              colorScheme="teal"
            >
              Adicionar despesa
            </Button>
          </View>
        </View>
      </View>
      {/* Verifique se a despesa selecionada existe antes de exibir o pop-up */}
      {selectedExpense && (
        <View style={styles.dialogContainer}>
          <Text style={styles.expenseName}>{selectedExpense.nome}</Text>
          <Text style={styles.expenseValue}>Valor:  R${selectedExpense.valor.toFixed(2)}</Text>
          <Text style={styles.expenseDescription}>Categoria: {selectedExpense.categoria}</Text>
          <Text style={styles.expenseDate}>Data: {selectedExpense.data}</Text>
          <Button
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleteExpense(selectedExpense.id)}
            colorScheme="red"
          >
            Excluir
          </Button>
          <Button
            style={[styles.button, styles.editButton]}
            onPress={() => handleEditExpense(selectedExpense.id)}
            colorScheme="blue"
          >
            Editar
          </Button>
          <Button
            style={[styles.button, styles.closeButton]}
            onPress={() => setSelectedExpense(null)}
            colorScheme="gray"
          >
            Fechar
          </Button>
        </View>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  totalDespesas: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 32,
    marginTop: 16,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 60,
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
  dialogContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  expenseValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  expenseDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: 'black',
  },
  expenseDate: {
    fontSize: 14,
    marginBottom: 24,
    color: 'black',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  closeButton: {
    backgroundColor: 'gray',
  },
});

export default ListagemDespesaScreen;
