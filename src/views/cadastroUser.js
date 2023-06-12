/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, NativeBaseProvider, FormControl, Box } from 'native-base';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { set } from 'firebase/database';

function CadastroScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ nome: '', email: '', senha: '' });
  const [confirmSenha, setConfirmSenha] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmSenhaError, setConfirmSenhaError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = getAuth();

  async function handleRegister() {
    try {
      setSenhaError('');
      setConfirmSenhaError('');
      console.log(user)
      if (user.senha !== confirmSenha) {
        setConfirmSenhaError('As senhas não correspondem');
        return;
      }
      if (user && user.senha) {
        if (user.senha.length < 6) {
          setSenhaError('A senha deve ter no mínimo 6 caracteres');
          return;
        }
      }
      

      await createUserWithEmailAndPassword(auth, user.email, user.senha).then(
        async (result) => {
          const { uid } = result.user;
          console.log("aqui")
          const userRef = collection(db, 'user', uid, 'info');
          await addDoc(userRef, user)
          navigation.navigate('Home');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider>
      <View style={styles.containerPai}>
        <View style={styles.containerFilho}>
          <View style={styles.content}>
            <View style={styles.formulario}>
              <Text style={styles.teste}>Cadastre-se</Text>
              <FormControl>
                <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
                  Nome
                </FormControl.Label>
                <Input
                  variant="outline"
                  placeholder="Nome"
                  onChangeText={(e) => setUser({ ...user, nome: e })}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
                  E-mail
                </FormControl.Label>
                <Input
                  variant="outline"
                  placeholder="E-mail"
                  onChangeText={(e) => setUser({ ...user, email: e })}
                />
              </FormControl>
              <FormControl
                isRequired={true}
                isInvalid={senhaError !== ''}
                mb={3}
              >
                <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
                  Senha
                </FormControl.Label>
                <Input
                  variant="outline"
                  placeholder="Senha"
                  type={showPassword ? 'text' : 'password'}
                  value={user.senha}
                  onChangeText={(e) => {
                    setSenhaError('');
                    setUser({ ...user, senha: e });
                  }}
                  InputRightElement={
                    <Button
                      variant="ghost"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  }
                />
                {senhaError !== '' && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {senhaError}
                  </Text>
                )}
              </FormControl>
              <FormControl
                isInvalid={confirmSenhaError !== ''}
                mb={3}
              >
                <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
                  Confirme a senha
                </FormControl.Label>
                <Input
                  variant="outline"
                  placeholder="Confirme a senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmSenha}
                  onChangeText={(e) => {
                    setConfirmSenhaError('');
                    setConfirmSenha(e);
                  }}
                  InputRightElement={
                    <Button
                      variant="ghost"
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  }
                />
                {confirmSenhaError !== '' && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {confirmSenhaError}
                  </Text>
                )}
              </FormControl>
              <Button style={styles.saveButton} onPress={handleRegister}>
                <Text style={styles.textSaveButton}>Salvar</Text>
              </Button>
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
