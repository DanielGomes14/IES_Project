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
        return fetch(baseURL + 'newdevices', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify({division: {id: division_id}, type: {id: type_id}, name: name})
            })
    }

    updateDeviceState(device) {
        return fetch(baseURL + DEVICES_REST_API_URL, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                },
                body: JSON.stringify(device)
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

    deleteDevice(device_id){
        return fetch(baseURL + DEVICES_REST_API_URL+ device_id,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        })
    }
}

export default new DeviceService();