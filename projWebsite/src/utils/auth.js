export const auth = {
    token: null,
    login(token) {
      this.token = token
    },
    logout() {
      this.token = null
    },
    isLogin() {
        return this.token;
    }
}