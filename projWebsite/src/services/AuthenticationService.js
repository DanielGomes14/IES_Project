import baseURL from "./../data/base-url";


class AuthenticationService {

    login(auth) {
        return fetch(baseURL + 'login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth
                }
            })
    }

    register(firstName, lastName, email, username, password) {
        return fetch(baseURL + 'register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
                body: JSON.stringify({ username: username, password: password, role: "", client: {firstName: firstName, lastName: lastName, email: email} })
            })
}

}

export default new AuthenticationService();