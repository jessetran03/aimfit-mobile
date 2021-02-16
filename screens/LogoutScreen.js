import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TokenService from '../services/token-service';

export default function LogoutScreen(props) {

  function handleLogout() {
    console.log('Successfully logged out')
    TokenService.clearToken()
    props.onLogout(false);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={() => handleLogout()}
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
