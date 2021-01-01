import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const DIVISIONS_REST_API_URL = "divisions"

class DivisionService {

    getDivisions(home_id) {
        return fetch(baseURL + (home_id + '/') + DIVISIONS_REST_API_URL + '/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    addDivision(home_id, name) {
        return fetch(baseURL + DIVISIONS_REST_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({ name: name, home: {id: home_id} })
            })

    }

    deleteDivision(division_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL + '/' + division_id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
        })
    }
}

export default new DivisionService();