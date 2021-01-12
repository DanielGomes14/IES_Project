import baseURL from "../data/base-url";
import { auth, current_home, current_user } from '../utils/auth';
class LocalStorageService {

    async get_user(username) {
        const res = await fetch(baseURL + 'user/' + username, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        });
        return await res.json();
    }

    async get_first_home(){
        const res = await fetch(baseURL + 'homes', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        });
        const json = await res.json();
        return json[Object.keys(json)[0]]["id"];
    }

}

export default new LocalStorageService();