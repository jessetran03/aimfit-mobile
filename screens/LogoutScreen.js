import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/Utils/Utils'
import TokenService from '../services/token-service';

export default function LogoutScreen(props) {

  function handleLogout() {
    console.log('Successfully logged out')
    TokenService.clearToken()
    props.onLogout(false);
  }

  return (
    <View style={styles.container}>
      <Button text='Log Out' onPress={() => handleLogout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
});
