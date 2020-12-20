import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const SENSORS_REST_API_URL = "sensors/"
const SENSORDATA_REST_API_URL = "sensordata/"
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
        alert('div ' + division_id + ' typ ' + type_id);
        return fetch(baseURL + 'newsensor', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({division: {id: division_id}, type: {id: type_id}})
            }).then(res => {
                console.log(res.json())
                if(res.ok){
                    window.location.pathname = '/'
                }
                else{
                    alert("Cannot add two sensors of same type!")
                }
            })
    }

    getSensorData(sen_id) {
        return fetch(baseURL + (SENSORS_REST_API_URL + sen_id + '/') + SENSORDATA_REST_API_URL + "?latest=true", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        })
        .then(res => res.json());
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