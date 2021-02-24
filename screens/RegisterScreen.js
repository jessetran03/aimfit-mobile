import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import Navigation from '../navigation';

export default function RegisterScreen({ props, navigation }) {

  const [fullName, onChangeFullName] = useState('Placeholder for username')
  const [username, onChangeUsername] = useState('Placeholder for username')
  const [password, onChangePassword] = useState('Placeholder for password')
  const [loading, setLoading] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false)
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

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
    <ImageBackground
      source={require('../dumbbell.jpeg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}></View>
        <Text style={styles.header}>Sign Up</Text>
        <Text style={styles.text}>Full Name</Text>
        <TextInput
          style={fullNameFocused ? styles.focusedInput : styles.input}
          onChangeText={text => onChangeFullName(text)}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Full Name"
          placeholderTextColor='#777'
          onFocus={() => setFullNameFocused(true)}
          onBlur={() => setFullNameFocused(false)}
        />
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={usernameFocused ? styles.focusedInput : styles.input}
          onChangeText={text => onChangeUsername(text)}
          autoCapitalize='none'
          autoCorrect={false}
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleRegister(fullName, username, password)}>
          <Text style={styles.buttonText}>
            Sign Up
        </Text>
        </TouchableOpacity>
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
