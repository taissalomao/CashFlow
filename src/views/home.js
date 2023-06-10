/* eslint-disable no-shadow *//* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';
import { Button } from 'native-base';

export default function HomeScreen() {
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
  const { user } = useAuthentication();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          return;
        }

        const userDocRef = doc(db, 'user', user.uid);
        const userDocSnapshot = await userDocRef.get();
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData && userData.nome) {
            setUserName(userData.nome);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchTotalDespesas = async () => {
      try {
        if (!user) {
          return;
        }

        const userDocRef = doc(db, 'user', user.uid);
        const expensesRef = collection(userDocRef, 'despesas');
        const q = query(expensesRef);
        const querySnapshot = await getDocs(q);
        let total = 0;
        querySnapshot.forEach((doc) => {
          const expense = doc.data();
          total += expense.valor;
        });
        setTotalDespesas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalDespesas();
  }, [user]);

  useEffect(() => {
    const fetchTotalReceitas = async () => {
      try {
        if (!user) {
          return;
        }

        const userDocRef = doc(db, 'user', user.uid);
        const revenuesRef = collection(userDocRef, 'receitas');
        const q = query(revenuesRef);
        const querySnapshot = await getDocs(q);
        let total = 0;
        querySnapshot.forEach((doc) => {
          const receita = doc.data();
          total += receita.valor;
        });
        setTotalReceitas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalReceitas();
  }, [user]);

  const navigateToProfile = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.welcome}>Bem-vindo, {userName}!</Text>
        <Button style={styles.avatarButton} onPress={navigateToProfile} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Receitas R$ {totalReceitas.toFixed(2)}</Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Receitas')}
        >
          <Text style={styles.buttonText}>Minhas Receitas</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('CadastroReceita')}
        >
          <Text style={styles.buttonText}>Cadastrar Receita</Text>
        </Button>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Despesas R$ {totalDespesas.toFixed(2)}</Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Despesas')}
        >
          <Text style={styles.buttonText}>Minhas Despesas</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('CadastroDespesa')}
        >
          <Text style={styles.buttonText}>Cadastrar Despesa</Text>
        </Button>
      </View>

      <Button
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Charts')}
      >
        <Text style={styles.buttonText}>Meus Relatórios</Text>
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1348cf',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 20,
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 20,
    elevation: 2,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1348cf',
  },
  button: {
    backgroundColor: '#79d6f7',
    borderRadius: 16,
    height: 52,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1348cf',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#79d6f7',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarButton: {
    backgroundColor: '#79d6f7',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
