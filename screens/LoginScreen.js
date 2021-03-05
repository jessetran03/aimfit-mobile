import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import ApiService from '../services/api-service';
import { Button } from '../components/Utils/Utils'
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginScreen({ route }) {

  const [username, onChangeUsername] = useState('Placeholder for username')
  const [password, onChangePassword] = useState('Placeholder for password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  function handleLogin(username, password) {
    setLoading(true);
    ApiService.login(username, password)
      .then(res => {
        TokenService.setToken(res.authToken)
        setLoading(false)
        route.params.onLogin(true);
      })
      .catch(res => {
        setLoading(false)
        setError(res.error)
      })
  }

  return (
    <ImageBackground
      source={require('../dumbbell.jpeg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}></View>
        <Text style={styles.header}>Log In</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={usernameFocused ? styles.focusedInput : styles.input}
          onChangeText={text => onChangeUsername(text)}
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          placeholder="Username"
          placeholderTextColor='#777'
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={passwordFocused ? styles.focusedInput : styles.input}
          onChangeText={text => onChangePassword(text)}
          autoCapitalize='none'
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor='#777'
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogin(username, password)}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableOpacity>
        <Button text='Log in' onPress={() => handleLogin(username, password)} />
        <Spinner visible={loading} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#39A9DB',
    borderStyle: 'solid',
    borderColor: '#34A4D7',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginTop: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'stretch',
    marginTop: 100,
  },
  error: {
    color: '#DD0000',
    fontWeight: 'bold'
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  },
  focusedInput: {
    backgroundColor: '#141A20',
    color: 'white',
    padding: 10,
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#141A20',
    color: 'white',
    padding: 10,
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#141A20',
    borderRadius: 10,
    marginBottom: 8,
  }
});
