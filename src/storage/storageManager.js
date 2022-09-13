class StorageManager {
  getLanguage = () => {
    localStorage.getItem('language');
  }

  setLanguage = (language) => {
    localStorage.setItem(language);
  }

  login = (data) => {
    this.saveToken(data.token);
    this.setUser(data.user);
  }

  loggout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  isAdmin = () => {
    const user = this.getUser();
    return !!user && user.type === 'super-admin';
  }

  isLogged = () => {
    return !!localStorage.getItem('jwt');
  }

  saveToken = (token) => {
    localStorage.setItem('jwt', token);
  }

  getBearerToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return '';
    }
    return `Bearer ${localStorage.getItem('jwt')}`;
  }

  setUser = (user) => {
    this.setObject('user', user);
  }

  getUser = () => {
    return this.getObject('user');
  }

  getObject = (key) => {
    const obj = localStorage.getItem(key);
    if (!obj || obj.length < 3 || obj === 'undefined') {
      return null;
    }

    return JSON.parse(obj);
  }

  setObject = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

export default new StorageManager();