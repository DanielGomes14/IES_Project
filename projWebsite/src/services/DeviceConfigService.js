import baseURL from "../data/base-url";
import { auth } from "../utils/auth";

const DEVICE_CONFIG_REST_API_URL = "deviceconfigurations";

class DeviceConfigService {

    getConfigurations(deviceId) {
        return fetch(baseURL + 'devices/' + (deviceId + '/') + DEVICE_CONFIG_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    addConfiguration(deviceId, timeBegin, timeEnd, value) {
        var dateBegin = new Date();
        dateBegin.setHours(timeBegin.split(':')[0]);
        dateBegin.setMinutes(timeBegin.split(':')[1]);
        var dateEnd = new Date();
        dateEnd.setHours(timeBegin.split(':')[0]);
        dateEnd.setMinutes(timeBegin.split(':')[1]);
        return fetch(baseURL + DEVICE_CONFIG_REST_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({device: {id: deviceId}, timeBegin: dateBegin, timeEnd: dateEnd, value: value})
        })

    }

    updateConfiguration(id, deviceId, timeBegin, timeEnd, value) {
        var dateBegin = new Date();
        dateBegin.setHours(timeBegin.split(':')[0]);
        dateBegin.setMinutes(timeBegin.split(':')[1]);
        var dateEnd = new Date();
        dateEnd.setHours(timeBegin.split(':')[0]);
        dateEnd.setMinutes(timeBegin.split(':')[1]);
        return fetch(baseURL + DEVICE_CONFIG_REST_API_URL + '/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({id: id, device: {id: deviceId}, timeBegin: dateBegin, timeEnd: dateEnd, value: value})
        })
    }
}

export default new DeviceConfigService();