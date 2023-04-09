/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';


function HomeScreen(/* { username } */) {

  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={styles.wrapper}>
{/*          <Text style={styles.buttonTexto}>Bem vindo{username}</Text> */}
        <View style={styles.container}>
          <Text style={styles.username}>Bem vindo{/* {username} */}</Text>
        </View>
        <View style={styles.overlay}>
        </View>
        <View style={styles.content}>
          <Text style={styles.texto}>Saldo</Text>
          <Text style={styles.texto}>R$ 0,00</Text>
          <Button style={styles.buttonReceita}
          onPress={()=>{navigation.navigate('CadastroReceita');}}>
            <Text style={styles.buttonTexto}>Adicionar Receita</Text>
          </Button>
        </View>
        <View style={styles.overlay2}>
      </View>
      <View style={styles.content2}>
        <Text style={styles.texto}>Despesas</Text>
        <Text style={styles.texto}>R$ 0,00</Text>
        <Button style={styles.buttonDespesa}
            onPress={()=>{navigation.navigate('CadastroDespesa');}}>
          <Text style={styles.buttonTexto}>Adicionar Despesa</Text>
        </Button>
      </View>
      <View>
        <Button style={styles.buttonProfile}
            onPress={()=>{navigation.navigate('CadastroDespesa');}}>
          <Text style={styles.buttonTexto}>Meu perfil</Text>
        </Button>
      </View>
      </View>
    </NativeBaseProvider>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#e8e9eb', //fundo aqui
  },
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#3005f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    margin: 24,
    height: 200,
    marginTop: 80,
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f8f8f8',
  },
  content: {
    flex: 1,
    margin: 32,
  },
  content2: {
    margin: 32,
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    margin: 24,
    height: 200,
    marginTop: 300,
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f8f8f8',
  },
  buttonReceita: {
    backgroundColor: '#79d6f7',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    borderRadius: 16,
  },
  buttonDespesa: {
    backgroundColor: '#79d6f7',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    borderRadius: 16,
  },
  buttonTexto: {
    color: '#1348cf',
    fontWeight: 'bold',
  },
  texto: {
    color: '#1348cf',
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonProfile: {
    backgroundColor: '#79d6f7',
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 50,
    borderRadius: 16,
  },
  welcomeTexto: {
    backgroundColor: '#79d6f7',
    color: '#1348cf',
    fontWeight: 'bold',
  },
});
