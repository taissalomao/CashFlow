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

const ListagemReceitaScreen = () => {
  const [revenues, setrevenues] = useState([]);
  const [totalreceitas, setTotalreceitas] = useState(0);
  const [selectedrevenue, setSelectedrevenue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuthentication();

  useEffect(() => {
    const fetchrevenues = async () => {
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
        setrevenues(revenueList);
        setTotalreceitas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchrevenues();
  }, [user, user?.uid]);

  const renderrevenueItem = ({ item }) => (
    <TouchableOpacity style={styles.revenueItem} onPress={() => handlerevenuePress(item)}>
      <Text style={styles.revenueTitle}>{item.nome}</Text>
      <Text style={styles.revenueAmount}>R$ {item.valor.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const handlerevenuePress = (revenue) => {
    setSelectedrevenue(revenue);
    setShowModal(true);
  };

  const handlerevenueDelete = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'user', user?.uid, 'receitas', selectedrevenue.id));
      const updatedrevenues = revenues.filter((e) => e.id !== selectedrevenue.id);
      setrevenues(updatedrevenues);
      const total = updatedrevenues.reduce((acc, cur) => acc + cur.valor, 0);
      setTotalreceitas(total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={[styles.container, { backgroundColor: 'blue', height: 30 }]}>
        <Text>Lista de receitas</Text>
        <Text>Total receitas: R$ {totalreceitas.toFixed(2)}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.revenueListContainer}>
          <FlatList
            data={revenues}
            renderItem={renderrevenueItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Nenhuma receita encontrada</Text>}
          />
          <View style={styles.topSection}>
            <Button
              style={styles.addButton}
              onPress={() => {
                navigation.navigate('CadastroReceita');
              }}
            >
              Adicionar receita
            </Button>
          </View>
        </View>
      </View>

      <Dialog
        visible={showModal}
        onTouchOutside={() => setShowModal(false)}
        dialogStyle={styles.dialogContainer}
      >
        {selectedrevenue && (
          <>
            <Text style={styles.revenueName}>{selectedrevenue.nome}</Text>
            <Text style={styles.revenueValue}>R$ {selectedrevenue.valor.toFixed(2)}</Text>
            <Text style={styles.revenueDescription}>{selectedrevenue.descricao}</Text>
            <Button
              style={styles.deleteButton}
              onPress={handlerevenueDelete}
              disabled={loading}
              colorScheme="red"
            >
              Excluir
            </Button>
            {loading && <Text>Excluindo receita...</Text>}
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
    backgroundColor: '#79d6f7',
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
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  revenueDescription: {
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

export default ListagemReceitaScreen;
