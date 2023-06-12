import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

export function useConfirmationExitEffect() {
  const navigation = useNavigation();
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        Alert.alert(
          'Confirmação',
          'Deseja encerrar sua sessão?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: async () => { await signOut(auth); navigation.navigate("Login") } }
          ]
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [navigation, auth, isFocused]);
}
