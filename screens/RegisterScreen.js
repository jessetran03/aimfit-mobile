import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import Navigation from '../navigation';

export default function RegisterScreen({ props, navigation }) {

  const [fullName, onChangeFullName] = useState('Placeholder for username')
  const [username, onChangeUsername] = useState('Placeholder for username')
  const [password, onChangePassword] = useState('Placeholder for password')
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  function handleRegister(fullName, username, password) {
    startLoading();
    const newUser = {
      full_name: fullName,
      user_name: username,
      password: password,
    }
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(res => {
        TokenService.setToken(res.authToken)
        setLoading(!loading)
        navigation.goBack()
      })
      .catch(res => {
        setLoading(!loading)
        console.error(res.error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}></View>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeFullName(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Full Name"
      />
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeUsername(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Username"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handleRegister(fullName, username, password)}>
        <Text style={styles.buttonText}>
          Sign Up
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
    marginTop: 10,
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
