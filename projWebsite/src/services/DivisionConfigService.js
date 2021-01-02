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
}

export default new DivisionConfigService();