import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const DEVICES_REST_API_URL = "devices/"

class DeviceService {

    getDevices(division_id) {
        return fetch(baseURL + (division_id + '/') + DEVICES_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    addDevice(division_id, type_id, name) {
        return fetch(baseURL + 'devices', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({ name: name, type: {id: type_id}, division: {id: division_id} })
            })
    }

    updateDeviceState(device_id, state) {
        return fetch(baseURL + DEVICES_REST_API_URL, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({ id: device_id, state: state })
            })
    }

    getDeviceState(device_id) {
        return fetch(baseURL + (device_id + '/') + DEVICES_REST_API_URL, {
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

export default new DeviceService();