import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { Button } from '../components/Utils/Utils'
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen'

const Stack = createStackNavigator();

export default function InitialScreen(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Back"
        screenOptions={{
          headerTintColor: '#39A9DB',
          headerTitleStyle: { color: 'black'},
        }}
      >
        <Stack.Screen
          name="Back"
          component={MainScreen}
          options={{ headerShown: false, headerTransparent: true }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ onLogin: props.onLogin }}
          options={{ headerShown: true, headerTransparent: true, title: '' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: true, headerTransparent: true, title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../dumbbell.jpeg')}
      style={{width: '100%', height: '100%'}}
      transition={false}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Aim to be Fit</Text>
        <Text style={styles.headerTwo}>Begin your journey.</Text>
        <Button 
          color='dark' 
          text='Log in' 
          onPress={() => navigation.navigate('Login')}
        />
        <Button 
          text='Sign Up'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: 80,
    marginBottom: 60,
  },
  header: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerTwo: {
    fontSize: 16,
    color: '#AAAAAA',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 260,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 8,
  }
});