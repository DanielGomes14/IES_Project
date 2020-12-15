import baseURL from "./../data/base-url";


class AuthenticationService {

    login(home_id) {
        return fetch(baseURL + 'login/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
            })
            .then(res => res.json());
    }

    register(first_name, last_name, email, username, password) {
        return fetch(baseURL + 'register/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
                body: JSON.stringify({ username: username, password: password, client: {first_name: first_name, last_name: last_name, email: email} })
            })
            .then(res => res.json())
}

}

export default new AuthenticationService();