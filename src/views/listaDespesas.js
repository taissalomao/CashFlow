/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';
import { doc } from 'firebase/firestore';
import Dialog from 'react-native-popup-dialog';
import { NativeBaseProvider, Button } from 'native-base';

const ListagemDespesaScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const renderExpenseItem = ({ item }) => (
    <TouchableOpacity style={styles.expenseItem} onPress={() => handleExpensePress(item)}>
      <Text style={styles.expenseTitle}>{item.nome}</Text>
      <Text style={styles.expenseAmount}>R$ {item.valor.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const handleExpensePress = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleExpenseDelete = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'user', user?.uid, 'despesas', selectedExpense.id));
      const updatedExpenses = expenses.filter((e) => e.id !== selectedExpense.id);
      setExpenses(updatedExpenses);
      const total = updatedExpenses.reduce((acc, cur) => acc + cur.valor, 0);
      setTotalDespesas(total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={[styles.container, { backgroundColor: 'blue', height: 30 }]}>
        <Text>Lista de despesas</Text>
        <Text>Total despesas: R$ {totalDespesas.toFixed(2)}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.expenseListContainer}>
          <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
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

      <Dialog
        visible={showModal}
        onTouchOutside={() => setShowModal(false)}
        dialogStyle={styles.dialogContainer}
      >
        {selectedExpense && (
          <>
            <Text style={styles.expenseName}>{selectedExpense.nome}</Text>
            <Text style={styles.expenseValue}>R$ {selectedExpense.valor.toFixed(2)}</Text>
            <Text style={styles.expenseDescription}>{selectedExpense.descricao}</Text>
            <Button
              style={styles.deleteButton}
              onPress={handleExpenseDelete}
              disabled={loading}
              colorScheme="red"
            >
              Excluir
            </Button>
            {loading && <Text>Excluindo despesa...</Text>}
          </>
        )}
      </Dialog>
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
  },
  expenseValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  expenseDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
});

export default ListagemDespesaScreen;
