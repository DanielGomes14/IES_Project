import baseURL from "../data/base-url";
import { auth } from "../utils/auth";

const DEVICE_CONFIG_REST_API_URL = "deviceconfigurations";

class DeviceConfigService {

    getConfigurations(device_id) {
        return fetch(baseURL + 'devices/' + (device_id + '/') + DEVICE_CONFIG_REST_API_URL, {
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

export default new DeviceConfigService();