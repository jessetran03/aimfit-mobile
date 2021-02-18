import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config'
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen(props) {

  const [username, onChangeUsername] = React.useState('Placeholder for username')
  const [password, onChangePassword] = React.useState('Placeholder for password')

  function handleLogin(username, password) {
    console.log(`Attempting to login`)
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
        console.log('Successfully logged in')
        props.onLogin(true);
      })
      .catch(res => {
        console.error(res.error)
      })
  }

  return (
    <View style={styles.container}>
      <Text>Begin your journey.</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeUsername(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Login"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button
        title="Login"
        onPress={() => handleLogin(username, password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  }
});
