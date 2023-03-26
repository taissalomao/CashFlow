/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import { NativeBaseProvider } from 'native-base';
//import Sidebar from '../components/sidebar';

import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function HomeScreen() {
  const navigation = useNavigation();
  return (

    <NativeBaseProvider>
{/*         <Sidebar/> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>CashFlow</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.welcome}>Bem-vindo(a) ao CashFlow!</Text>
          <Text style={styles.description}>Aqui você pode gerenciar suas finanças de forma fácil e intuitiva.</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Despesas')}>
            <Text style={styles.buttonText}>Ver Despesas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Receitas')}>
            <Text style={styles.buttonText}>Ver Receitas</Text>
          </TouchableOpacity>
        </View>
      </View>

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F7',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0092b3',
  },
  menuIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#0092b3',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#6B6B6B',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#0092b3',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;

