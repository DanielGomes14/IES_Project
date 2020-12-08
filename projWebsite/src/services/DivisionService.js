import baseURL from "./../data/base-url";

const DIVISIONS_REST_API_URL = "METER URL PARA A API/"

class DivisionService {

    getDivisions(home_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL + home_id)
            .then(res => res.json())
            .then(data => console.log(data));
    }

    addDivisions(home_id, name, users_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL)
            .then(res => res.json())
            .then(data => console.log(data));
    }

}

export default new DivisionService();