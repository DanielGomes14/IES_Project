import baseURL from "./../data/base-url";
import { auth, current_home } from "../utils/auth";

const DIVISIONS_REST_API_URL = "divisions"

class DivisionService {

    async getDivisions() {
        const res = await fetch(baseURL + (current_home.current_home() + '/') + DIVISIONS_REST_API_URL + '/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }

    addDivision(name) {
        return fetch(baseURL + "divisions", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({ name: name, home: {id: current_home.current_home()} })
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