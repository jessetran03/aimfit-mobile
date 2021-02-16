import * as SecureStore from 'expo-secure-store';

const TokenService = {
  setToken(token) {
    return SecureStore.setItemAsync('secure_token', token);
  },
  getToken() {
    return SecureStore.getItemAsync('secure_token');
  },
  clearToken() {
    return SecureStore.deleteItemAsync('secure_token')
  },
  async hasToken() {
    return !!(await TokenService.getToken())
  },
}

export default TokenService