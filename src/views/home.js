/* eslint-disable no-shadow *//* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, doc, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/authenticator';
import MonthPicker from 'react-native-month-year-picker';
import { Button, Avatar } from 'native-base';

export default function HomeScreen() {
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalLucro, setTotalLucro] = useState(0); // Novo estado para o lucro
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Estado para controlar a visibilidade do datepicker
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para armazenar a data selecionada (mês e ano)
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
        const infoRef = collection(userDocRef, 'info');
        const q = query(infoRef);
        const userDocSnapshot = await getDocs(q);
        userDocSnapshot.forEach((doc) => {
          const userData = doc.data()
          if (userData && userData.nome) {
            setUserName(userData.nome)
          }
        })

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

        const currentDate = new Date()
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentYear = currentDate.getFullYear();

        const userDocRef = doc(db, 'user', user.uid);
        const expensesRef = collection(userDocRef, 'despesas');
        const q = query(expensesRef, where('data', '>=', `01${currentMonth}${currentYear}`), where('data', '<=', `31${currentMonth}${currentYear}`));
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

        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentYear = currentDate.getFullYear();

        const userDocRef = doc(db, 'user', user.uid);
        const revenuesRef = collection(userDocRef, 'receitas');
        const q = query(revenuesRef, where('data', '>=', `01${currentMonth}${currentYear}`), where('data', '<=', `31${currentMonth}${currentYear}`));
        const querySnapshot = await getDocs(q);
        let total = 0;
        querySnapshot.forEach((doc) => {
          const revenue = doc.data();
          total += revenue.valor;
        });
        setTotalReceitas(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalReceitas();
  }, [user]);

  useEffect(() => {
    const calcularLucro = () => {
      setTotalLucro(totalReceitas - totalDespesas);
    };

    calcularLucro();
  }, [totalDespesas, totalReceitas]);

  const navigateToProfile = () => {
    navigation.navigate('Perfil');
  };


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    if (date) {
      setSelectedDate(date);
    }
    setDatePickerVisible(false);
  };



  return (
    <ScrollView style={{
      backgroundColor: "#EAF0F7",
      flex: 1,
      paddingTop: 5,
    }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.welcome}>Bem-vindo, {userName}!</Text>
          <Button style={styles.avatarButton} onPress={navigateToProfile}>
            <Avatar size="sm" bg="blue.500" color="white">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Button>
        </View>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Selecionar Mês</Text>
        </TouchableOpacity>
        <Text style={styles.selectedDateText}>
          Mês selecionado: {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>

        {isDatePickerVisible && (
          <MonthPicker
            onChange={(event, newDate) => handleDateConfirm(newDate)}
            value={selectedDate}
            minimumDate={new Date(2000, 0)}
            maximumDate={new Date()}
            locale="pt"
          />
        )}
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

        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              totalLucro < 0 && styles.negativeProfit,
              totalLucro > 0 && styles.positiveProfit,
              totalLucro === 0 && styles.zeroProfit,
            ]}
          >
            Lucro R$ {totalLucro.toFixed(2)}
          </Text>
        </View>

        <Button
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Charts')}
        >
          <Text style={styles.buttonText}>Meus Relatórios</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e9eb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10, // Altere para o valor desejado
  },
  negativeProfit: {
    color: 'red',
  },
  positiveProfit: {
    color: 'green',
  },
  zeroProfit: {
    color: 'blue',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1348cf',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
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
    width: '90%',
    borderRadius: 16,
    height: 52,
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
