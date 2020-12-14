import baseURL from "./../data/base-url";

const DIVISIONS_REST_API_URL = "divisions/"

class DivisionService {

    getDivisions(home_id) {
        return fetch(baseURL + (home_id + '/') + DIVISIONS_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                }
            })
            .then(res => res.json());
    }

    addDivisions(home_id, name) {
        return fetch(baseURL + DIVISIONS_REST_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
                body: JSON.stringify({ name: name, home: {id: home_id} })
            })
            .then(res => res.json());
    }
}

export default new DivisionService();