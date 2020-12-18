import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const SENSORS_REST_API_URL = "sensors/"

class SensorService {

    getSensors(div_id) {
        return fetch(baseURL + (div_id + '/') + SENSORS_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    addSensor(division_id, type_id) {
        console.log('div ' + division_id + ' typ ' + type_id);
        return fetch(baseURL + 'newsensor', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({division: {id: division_id}, type: {id: type_id}})
            })
    }

    getSensorData(sen_id) {
        return fetch(baseURL + (sen_id + '/') + SENSORS_REST_API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        })
        .then(res => res.json());
    }
}

export default new SensorService();