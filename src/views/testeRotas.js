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





