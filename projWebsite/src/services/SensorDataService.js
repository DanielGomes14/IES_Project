import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const SENSORDATA_REST_API_URL = "sensordata/"

class SensorDataService {
    async getSensorData(div_id) {
        const res = await fetch(baseURL + ('divisions/' + div_id + '/') + SENSORDATA_REST_API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }

}

export default new SensorDataService();