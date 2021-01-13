import baseURL from "../data/base-url";
import { auth } from "../utils/auth";
import { hourToTimestamp } from "../utils/date";

const DEVICE_CONFIG_REST_API_URL = "devices/configurations";

class DeviceConfigService {

    async getConfigurations(deviceId) {
        const res = await fetch(baseURL + 'devices/' + deviceId + '/configurations', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }

    addConfiguration(deviceId, timeBegin, timeEnd, value) {
        return fetch(baseURL + "devices/configurations", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({device: {id: deviceId}, timeBegin: hourToTimestamp(timeBegin), timeEnd: hourToTimestamp(timeEnd), value: value})
        })
    }

    updateConfiguration(id, deviceId, timeBegin, timeEnd, value) {
        console.log(hourToTimestamp(timeBegin));
        console.log(hourToTimestamp(timeEnd));

        return fetch(baseURL + DEVICE_CONFIG_REST_API_URL + '/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({id: id, device: {id: deviceId}, timeBegin: hourToTimestamp(timeBegin), timeEnd: hourToTimestamp(timeEnd), value: value})
        })
    }
}

export default new DeviceConfigService();