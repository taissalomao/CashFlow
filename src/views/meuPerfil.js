/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text, NativeBaseProvider } from 'native-base';
import { doc, collection, query, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function PerfilScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const userDocRef = doc(db, 'user', currentUser.uid);
            const infoRef = collection(userDocRef, 'info');
            const q = query(infoRef);
            const userDocSnapshot = await getDocs(q);
            userDocSnapshot.forEach((doc) => {
              const userData = doc.data();
              if (userData && userData.nome) {
                setUser(userData);
                setEditableUser(userData);
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleInputChange = (field, value) => {
    setEditableUser({ ...editableUser, [field]: value });
  };

  async function handleSave() {
    try {
      if (!editableUser.nome || !editableUser.email) {
        console.log('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      if (editableUser.senha !== editableUser.confirmarSenha) {
        console.log('A senha e a confirmação da senha não coincidem.');
        return;
      }

      const userDocRef = doc(db, 'user', auth.currentUser.uid);
      const infoRef = collection(userDocRef, 'info');

      const userDocSnapshot = await getDocs(infoRef);
      if (userDocSnapshot.empty) {
        await setDoc(infoRef, editableUser);
      } else {
        const docId = userDocSnapshot.docs[0].id;
        await setDoc(doc(infoRef, docId), editableUser);
      }

      setUser(editableUser);
      setIsEditing(false);

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider>
      <View style={styles.containerPai}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Meu perfil</Text>
        </View>
        <View style={styles.containerFilho}>
          <View style={styles.content}>
            <View style={styles.formulario}>
              <View style={styles.inputs}>
                <Text style={styles.label}>Nome</Text>
                <Input
                  variant="outline"
                  placeholder="Nome"
                  onChangeText={(e) => handleInputChange('nome', e)}
                  value={editableUser.nome || ''}
                  editable={isEditing}
                />
              </View>
              <View style={styles.inputs}>
                <Text style={styles.label}>Email</Text>
                <Input
                  variant="outline"
                  placeholder="Email"
                  onChangeText={(e) => handleInputChange('email', e)}
                  value={editableUser.email || ''}
                  editable={isEditing}
                />
              </View>
              {isEditing && (
                <>
                  <View style={styles.inputs}>
                    <Text style={styles.label}>Senha</Text>
                    <Input
                      variant="outline"
                      placeholder="Senha"
                      onChangeText={(e) => handleInputChange('senha', e)}
                      value={editableUser.senha || ''}
                      secureTextEntry
                    />
                  </View>
                  <View style={styles.inputs}>
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <Input
                      variant="outline"
                      placeholder="Confirmar Senha"
                      onChangeText={(e) => handleInputChange('confirmarSenha', e)}
                      value={editableUser.confirmarSenha || ''}
                      secureTextEntry
                    />
                  </View>
                </>
              )}
              <View style={styles.buttonContainer}>
                {!isEditing && (
                  <Button onPress={() => setIsEditing(true)} style={styles.button}>
                    Editar
                  </Button>
                )}
                {isEditing && (
                  <Button onPress={handleSave} style={styles.button}>
                    Salvar
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  containerFilho: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  formulario: {
    marginTop: 20,
    width: '100%',
  },
  inputs: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1348cf',
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
});

export default PerfilScreen;
