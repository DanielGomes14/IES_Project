export const auth = {
  login(token, username) {
    localStorage.setItem('token', token);
  },
  logout() {
    localStorage.removeItem('token');
  },
  token() {
      return localStorage.getItem('token');
  }
}

export const current_home = {
  change_home(home) {
    localStorage.setItem('current_home', home);
  },
  remove_home() {
    localStorage.removeItem('current_home');
  },
  current_home() {
      return localStorage.getItem('current_home');
  }
}

export const current_user = {
  login(user) {
    localStorage.setItem('current_user', user);
  },
  storeUsername(username) {
    localStorage.setItem('current_username', username);
  },
  getUsername() {
    localStorage.getItem('current_username');
  },
  logout() {
    localStorage.removeItem('current_user');
  },
  current_user() {
      return localStorage.getItem('current_user');
  }
}
