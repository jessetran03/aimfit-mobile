import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import TokenService from '../services/token-service';

export default function LogoutScreen(props) {

  function handleLogout() {
    console.log('Successfully logged out')
    TokenService.clearToken()
    props.onLogout(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    backgroundColor: '#333',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    margin: 15,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
