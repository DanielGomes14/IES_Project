export const auth = {
    login(token) {
      localStorage.setItem('token', token);
    },
    logout() {
      localStorage.removeItem('token');
    },
    token() {
        return localStorage.getItem('token');
    }
}