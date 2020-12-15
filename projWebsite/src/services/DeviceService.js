import baseURL from "./../data/base-url";

const DEVICES_REST_API_URL = "devices/"

class DeviceService {

    getDevices(home_id) {
        return fetch(baseURL + (home_id + '/') + DEVICES_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                }
            })
            .then(res => res.json());
    }

    addDevices(division_id, type_id, name) {
        return fetch(baseURL + DEVICES_REST_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Basic ' + window.btoa('chico' + ":" + 'randomquerty')
                },
                body: JSON.stringify({ name: name, type: {id: type_id}, division: {id: division_id} })
            })
            .then(res => res.json());
    }
}

export default new DeviceService();