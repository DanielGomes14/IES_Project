import baseURL from "../data/base-url";
import { auth } from "../utils/auth";
import { current_home } from "../utils/auth"

const DEVICE_LOG_REST_API_URL = "sensorlog";

class DeviceLogService {

    async getDeviceLogs(home_id) {
        const res = await fetch(baseURL + home_id + '/' + DEVICE_LOG_REST_API_URL, {
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

export default new DeviceLogService();