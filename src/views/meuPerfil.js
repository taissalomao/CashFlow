/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, NativeBaseProvider } from 'native-base';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importar createUserWithEmailAndPassword

function PerfilScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ nome: '', email: '', senha: '' });
  const auth = getAuth(); // Obter a instância de autenticação

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const { uid } = currentUser;
          const usersRef = doc(db, 'user', uid);
          const userSnapshot = await getDoc(usersRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser(userData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserData();
  }, [auth.currentUser]);

  async function handleRegister() {
    try {
      const { email, senha } = user;
      const authUser = await createUserWithEmailAndPassword(auth, email, senha);

      const { uid } = authUser.user;
      const usersRef = doc(db, 'user', uid);
      await setDoc(usersRef, user);
      
      // Crie um novo objeto com os valores atualizados
      const updatedUser = { ...user };
      setUser(updatedUser);
      
      navigation.navigate('Home');
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
              <Text style={styles.teste}>Meu perfil</Text>
              <View style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Nome"
                  onChangeText={(e) => setUser({ ...user, nome: e })}
                  value={user.nome}
                />
              </View>
              <View style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Email"
                  onChangeText={(e) => setUser({ ...user, email: e })}
                  value={user.email}
                />
              </View>
              <View style={styles.inputs}>
                <Input
                  variant="outline"
                  placeholder="Senha"
                  onChangeText={(e) => setUser({ ...user, senha: e })}
                  value={user.senha}
                />
              </View>
              <View style={styles.inputs}>
                <Input variant="outline" placeholder="Confirme a senha" />
              </View>
              <View style={styles.inputs}>
                <Button style={styles.saveButton} onPress={handleRegister}>
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

export default PerfilScreen;

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
    width: '80%',
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: '#1E90FF',
  },
  textSaveButton: {
    color: 'white',
  },
});
