/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';
import { doc } from 'firebase/firestore';
import { NativeBaseProvider, Button } from 'native-base';

const ListagemReceitaScreen = () => {
  const [revenues, setRevenues] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [selectedRevenue, setSelectedRevenue] = useState(null); // Variável para armazenar a receita selecionada
  const navigation = useNavigation();
  const { user } = useAuthentication();

  useEffect(() => {
    const fetchRevenues = async () => {
      console.log('User:', user);
      console.log('User ID:', user?.uid);

      try {
        const userDocRef = doc(db, 'user', user?.uid);
        const revenuesRef = collection(userDocRef, 'receitas');
        const q = query(revenuesRef);
        const querySnapshot = await getDocs(q);
        const revenueList = [];
        let total = 0;
        querySnapshot.forEach((doc) => {
          const revenue = { id: doc.id, ...doc.data() };
          revenueList.push(revenue);
          total += revenue.valor;
        });
        console.log('revenue List:', revenueList);
        setRevenues(revenueList);
        setTotalReceitas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRevenues();
  }, [user, user?.uid]);

  

  const handleEditRevenue = (revenueId) => {
    const revenueToEdit = revenues.find((revenue) => revenue.id === revenueId);
    if (revenueToEdit) {
      setSelectedRevenue(revenueToEdit); // Defina a receita selecionada
      navigation.navigate('EditarReceita', { receita: revenueToEdit });
    }
  };



  const handleDeleterevenue = async (revenueId) => {
    if (selectedRevenue) {
      try {
        await deleteDoc(doc(db, 'user', user?.uid, 'receitas', revenueId));
        console.log('receita excluída:', revenueId);
        // Atualize a lista de receitas após excluir
        const updatedrevenues = revenues.filter((revenue) => revenue.id !== revenueId);
        setRevenues(updatedrevenues);
        setSelectedRevenue(null); // Limpar a receita selecionada após excluir
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderRevenueItem = ({ item }) => (
    <TouchableOpacity
      style={styles.revenueItem}
      onPress={() => setSelectedRevenue(item)} // Defina a receita selecionada quando o item for pressionado
    >
      <Text style={styles.revenueTitle}>{item.nome}</Text>
      <Text style={styles.revenueAmount}>R$ {item.valor.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.totalreceitas}>Total de receitas: R$ {totalReceitas.toFixed(2)}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.revenueListContainer}>
          <FlatList
            data={revenues}
            keyExtractor={(item) => item.id}
            renderItem={renderRevenueItem}
            ListEmptyComponent={<Text>Nenhuma receita encontrada</Text>}
          />
          <View style={styles.topSection}>
            <Button
              style={styles.addButton}
              onPress={() => {
                navigation.navigate('CadastroReceita');
              }}
              colorScheme="teal"
            >
              Adicionar receita
            </Button>
          </View>
        </View>
      </View>
      {/* Verifique se a receita selecionada existe antes de exibir o pop-up */}
      {selectedRevenue && (
        <View style={styles.dialogContainer}>
          <Text style={styles.revenueName}>{selectedRevenue.nome}</Text>
          <Text style={styles.revenueValue}>Valor: R$ {selectedRevenue.valor.toFixed(2)}</Text>
          <Text style={styles.revenueDescription}>{selectedRevenue.descricao}</Text>
          <Text style={styles.revenueDate}>Categoria: {selectedRevenue.categoria}</Text>
          <Text style={styles.revenueDate}>Data: {selectedRevenue.data}</Text>
          <Button
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDeleterevenue(selectedRevenue.id)}
            colorScheme="red"
          >
            Excluir
          </Button>
          <Button
            style={[styles.button, styles.editButton]}
            onPress={() => handleEditRevenue(selectedRevenue.id)}
            colorScheme="blue"
          >
            Editar
          </Button>
          <Button
            style={[styles.button, styles.closeButton]}
            onPress={() => setSelectedRevenue(null)}
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
  totalreceitas: {
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
  revenueListContainer: {
    flex: 1,
  },
  revenueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  revenueTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  revenueAmount: {
    fontSize: 14,
    color: 'black',
  },
  dialogContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  revenueName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  revenueDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: 'black',
  },
  revenueDate: {
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

export default ListagemReceitaScreen;
