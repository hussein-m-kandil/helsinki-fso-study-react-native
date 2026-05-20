import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'AuthStorage') {
    this._storage = AsyncStorage;
    this._KEY = `${namespace}:token`;
  }

  async getAccessToken() {
    return await this._storage.getItem(this._KEY);
  }

  async setAccessToken(accessToken) {
    return await this._storage.setItem(this._KEY, accessToken);
  }

  async removeAccessToken() {
    return await this._storage.removeItem(this._KEY);
  }
}

export default AuthStorage;
