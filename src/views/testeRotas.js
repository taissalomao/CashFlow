import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Content, Button, Text } from 'native-base';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <Container>
      <Header>
        <Text>Home</Text>
      </Header>
      <Content>
        <Button onPress={() => navigation.navigate('Profile')}>
          <Text>Go to Profile</Text>
        </Button>
      </Content>
    </Container>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <Container>
      <Header>
        <Text>Profile</Text>
      </Header>
      <Content>
        <Button onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </Button>
      </Content>
    </Container>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
Nesta função, criamos duas telas - Home e Profile - que são renderizadas usando o NativeBase. Usamos o createStackNavigator para criar um conjunto de rotas e definimos duas rotas - "Home" e "Profile" - com suas respectivas telas. Em cada tela, usamos um Container do NativeBase para envolver o conteúdo e Header para adicionar um cabeçalho. Usamos um botão do NativeBase para navegar entre as telas usando navigation.navigate e navigation.goBack.

Espero que isso ajude!




Taís salomão
mas não é preciso instalar essa biblioteca?
Sim, é necessário instalar a biblioteca react-navigation para usar as rotas em React Native. Você pode instalar a biblioteca usando o gerenciador de pacotes npm ou yarn.

Para instalar a biblioteca react-navigation, execute o seguinte comando no terminal:

java
Copy code
npm install @react-navigation/native
ou

java
Copy code
yarn add @react-navigation/native
Em seguida, você precisará instalar as dependências específicas da plataforma (por exemplo, react-native-gesture-handler, react-native-reanimated, etc). Para isso, execute os seguintes comandos:

java
Copy code
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
ou

java
Copy code
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
Depois de instalar as dependências, você pode usar o createStackNavigator e outras funções de navegação fornecidas pela biblioteca react-navigation para criar rotas em seu aplicativo React Native.





