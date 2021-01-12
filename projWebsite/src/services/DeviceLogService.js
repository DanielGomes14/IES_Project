import baseURL from "../data/base-url";
import { auth } from "../utils/auth";

const DEVICE_LOG_REST_API_URL = "sensorlog/";

class DeviceLogService {

    getDeviceLogs(deviceId) {
        return fetch(baseURL + DEVICE_LOG_REST_API_URL + deviceId, {
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

export default new DeviceLogService();