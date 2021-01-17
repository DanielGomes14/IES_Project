import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";
import {transitionAlertTrigger} from "../components/common/TransitionAlertTrigger";

const SENSORS_REST_API_URL = "sensors/";
const SENSORDATA_REST_API_URL = "sensordata/";


class SensorService {

    async getSensors(div_id) {
        const res = await fetch(baseURL + (div_id + '/') + SENSORS_REST_API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }

    async addSensor(division_id, type_id) {
        const res = await fetch(baseURL + 'sensors', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({ division: { id: division_id }, type: { id: type_id } })
        });
        console.log(res.json());
        if (res.ok) {
            window.location.pathname = '/';
        }
        else {
            transitionAlertTrigger("Cannot add two sensors of same type!", "error", false)
        }
    }

    async getSensorData(sen_id) {
        const res = await fetch(baseURL + (SENSORS_REST_API_URL + sen_id + '/') + SENSORDATA_REST_API_URL + "?latest=true", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        });
        return await res.json();
    }

    deleteSensor(sen_id){
        return fetch(baseURL + SENSORS_REST_API_URL+ sen_id,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        })
    }


}

export default new SensorService();