/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Text, NativeBaseProvider } from 'native-base';
import {set, ref} from 'firebase/database';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {database} from '../config/firebaseConfig';

function CadastroScreen() {
  const [user, setUser] = useState({nome: '', email: '', senha: ''});
  const auth = getAuth();
  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.senha).then(
        async result => {
          set(ref(database, `user/${result.user.uid}`), user);
        },
        
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <NativeBaseProvider>
{/*       <AppBar /> */}
      <View style={styles.containerPai}>
        <View style={styles.containerFilho}>
          <View style={styles.content} >
            <View style={styles.formulario}>
            <Text style={styles.teste}>Cadastro de Usuário</Text>
              <View
                style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Nome"
                  onChangeText={e => setUser({...user, nome: e})}
                />
              </View>
              <View
                style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Email"
                  onChangeText={e => setUser({...user, email: e})}
                />
              </View>
              <View
                style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Senha"
                  onChangeText={e => setUser({...user, senha: e})}
                />
              </View>
              <View
                style={styles.inputs}>
                <Input variant="outline" placeholder="Confirme a senha" />
              </View>
              <View style={styles.inputs}>
                <Button style={styles.saveButton}
                  onPress={() => handleRegister()}>
                  <Text style={styles.textSaveButton}>Salvar</Text>
                </Button>
              </View>
            </View>
        </View>
        </View>

      </View>
    </NativeBaseProvider>
  );
}

export default CadastroScreen;

const styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    backgroundColor: '#EAF0F7',
    justifyContent: 'flex-start',
  },
  containerFilho: {
    flex: 0.3,
    backgroundColor: 'blue',
    paddingTop: 70,
  },
  teste: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    padding: 10,
    height: 500,
    justifyContent: 'space-around',
  },
  formulario: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#79d6f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  textSaveButton: {
    color: '#1348cf',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
