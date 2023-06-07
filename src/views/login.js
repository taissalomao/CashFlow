/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Input } from 'native-base';
import { NativeBaseProvider, Link } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { getAuth} from 'firebase/auth/react-native';
//import Sidebar from '../components/sidebar';
//import AppBar from '../components/nav';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen() {
  const [user, setUser] = useState({ email: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const authFirebase = getAuth();

  async function login() {
    if (user.email === '' || user.senha === '') {
      console.log('vazios');
      return;
    }
    try {
      await signInWithEmailAndPassword(
        authFirebase,
        user.email,
        user.senha
      ).then((res) => {
        navigation.navigate('Home');
      }).catch((error) => {
        setError('Senha incorreta. Tente novamente.');
      });
    } catch (error) {
      console.log(error);
    }
  }

  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Input
              variant="underlined"
              placeholder="Email"
              onChangeText={(e) => setUser({ ...user, email: e })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              variant="underlined"
              placeholder="Senha"
              onChangeText={(e) => setUser({ ...user, senha: e })}
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Button
                  variant="ghost"
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordVisibilityButton}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              }
            />
            {error !== '' && (
              <Text style={styles.errorText}>{error}</Text>
            )}
            <Text style={styles.linkText}>
              <Link onPress={() => navigation.navigate('CadastroUser')}>
                Cadastre-se aqui
              </Link>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              size="lg"
              borderRadius={16}
              onPress={login}
              colorScheme="blue"
              style={styles.loginButton}
            >
              Login
            </Button>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF0F7',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 130,
    alignSelf: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  passwordVisibilityButton: {
    alignSelf: 'flex-end',
  },
  linkText: {
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginButton: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default LoginScreen;
