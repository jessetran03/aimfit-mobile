import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config';
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginScreen({ route }) {

  const [username, onChangeUsername] = useState('Placeholder for username')
  const [password, onChangePassword] = useState('Placeholder for password')
  const [loading, setLoading] = useState(false);

  function handleLogin(username, password) {
    setLoading(true);
    const login = {
      user_name: username,
      password: password,
    }
    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(login),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(res => {
        TokenService.setToken(res.authToken)
        setLoading(!loading)
        route.params.onLogin(true);
      })
      .catch(res => {
        setLoading(!loading)
        console.error(res.error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}></View>
      <Text style={styles.header}>Log In</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeUsername(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Login"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogin(username, password)}>
        <Text style={styles.buttonText}>
          Log In
        </Text>
      </TouchableOpacity>
      <Spinner visible={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#333',
    borderStyle: 'solid',
    borderColor: 'black',
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
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
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
