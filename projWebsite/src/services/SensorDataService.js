import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const SENSORS_REST_API_URL = "sensors/"
const SENSORDATA_REST_API_URL = "sensordata/"
class SensorDataService {
    getSensorData(div_id) {
        return fetch(baseURL + ('divisions/' + div_id + '/') + SENSORDATA_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

}

export default new SensorDataService();