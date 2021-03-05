import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import Spinner from 'react-native-loading-spinner-overlay';
import ApiService from '../services/api-service';

export default function RegisterScreen({ navigation }) {

  const [fullName, onChangeFullName] = useState('Placeholder for username')
  const [username, onChangeUsername] = useState('Placeholder for username')
  const [password, onChangePassword] = useState('Placeholder for password')
  const [error, setError] = useState(null)
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
    ApiService.registerRootComponent(fullName, username, password)
      .then(res => {
        TokenService.setToken(res.authToken)
        setLoading(!loading)
        navigation.goBack()
      })
      .catch(res => {
        setLoading(!loading)
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
        <Text style={styles.header}>Sign Up</Text>
        {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    color: '#DD0000',
    fontWeight: 'bold',
    marginBottom: 10,
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
