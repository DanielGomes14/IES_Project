import baseURL from "../data/base-url";
import { auth } from "../utils/auth";

const DIVISION_CONFIG_REST_API_URL = "divisionconfigurations";

class DivisionConfigService {

    getConfigurations(division_id) {
        return fetch(baseURL + "divisions/" + (division_id + "/") + DIVISION_CONFIG_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    addConfiguration(deviceId, type, minValue, maxValue) {
        return fetch(baseURL + DIVISION_CONFIG_REST_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({device: {id: deviceId}, type: type, minValue: minValue, maxValue: maxValue})
        })
    }

    updateConfiguration(id, deviceId, type, minValue, maxValue) {
        return fetch(baseURL + DIVISION_CONFIG_REST_API_URL + '/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({id: id, device: {id: deviceId}, type: type, minValue: minValue, maxValue: maxValue})
        })
    }
}

export default new DivisionConfigService();