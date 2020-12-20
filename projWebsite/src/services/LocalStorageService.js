import baseURL from "../data/base-url";
import { auth, current_home, current_user } from '../utils/auth';
class LocalStorageService {

    get_user(username) {
        return fetch(baseURL + 'user/' + username, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        }).then(res=>res.json());
    }

    get_first_home(){
        return fetch(baseURL +'homes', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token()
            }
        })
        .then(res => res.json()).then(json => json[Object.keys(json)[0]]["id"])
    }

}

export default new LocalStorageService();