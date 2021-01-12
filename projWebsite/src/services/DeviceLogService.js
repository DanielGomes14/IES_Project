import baseURL from "../data/base-url";
import { auth } from "../utils/auth";

const DEVICE_LOG_REST_API_URL = "sensorlog";

class DeviceLogService {

    async getDeviceLogs(deviceId) {
        const res = await fetch(baseURL + deviceId + '/' + DEVICE_LOG_REST_API_URL, {
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