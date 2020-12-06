import baseURL from "./../data/base-url";

const DIVISIONS_REST_API_URL = "METER URL PARA A API/"

class DivisionService {

    getDivisions(home_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL + home_id).then((res => res.json()))
    }

    addDivisions(home_id, name, users_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL).then((res => res.json()))
    }

}

export default new DivisionService();