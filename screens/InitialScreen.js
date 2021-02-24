import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>
            Log In
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButtonContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>
            Sign Up
        </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#141A20',
    borderStyle: 'solid',
    borderColor: '#2A2A2A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginTop: 20,
  },
  registerButtonContainer: {
    backgroundColor: '#39A9DB',
    borderStyle: 'solid',
    borderColor: '#34A4D7',
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginTop: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
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