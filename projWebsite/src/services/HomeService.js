import baseURL from "../data/base-url";
import { auth,current_user,current_home } from "../utils/auth";

const HOME_REST_API_URL = "homes/"

class HomeService {

    getHomesDropdown() {
        return fetch(baseURL + HOME_REST_API_URL, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: auth.token(),
                }
            })
            .then(res => res.json());
    }

    getHomeById(){
        console.log(current_home)
        return fetch(baseURL + HOME_REST_API_URL + current_home.current_home(),{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res=>res.json());
    }



}

export default new HomeService();