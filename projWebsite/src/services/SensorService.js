import baseURL from "./../data/base-url";

const SENSORS_REST_API_URL = "sensors/"

class SensorService {

    getSensors(home_id) {
        return fetch(baseURL + (home_id + '/') + SENSORS_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                }
            })
            .then(res => res.json());
    }

    addSensors(division_id, type_id) {
        return fetch(baseURL + SENSORS_REST_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
                body: JSON.stringify({division: {id: division_id}, type: {id: type_id}})
            })
            .then(res => res.json());
    }
}

export default new SensorService();