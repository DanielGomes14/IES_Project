import baseURL from "./../data/base-url";

const DIVISIONS_REST_API_URL = "1/divisions/"

class DivisionService {

    getDivisions(home_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL,{ //+ home_id)
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': 'Content-Type'
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                }
            })
            .then(res => res.json());
    }

    addDivisions(home_id, name, users_id) {
        return fetch(baseURL + DIVISIONS_REST_API_URL, //+ home_id)
        {
            method: 'POST',
            // mode: 'cors',
            // body: "param=" + paramVar,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data));
}

}

export default new DivisionService();