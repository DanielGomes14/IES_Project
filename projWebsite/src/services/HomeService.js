import baseURL from "../data/base-url";
import { auth,current_user,current_home } from "../utils/auth";

const HOME_REST_API_URL = "homes/"

class HomeService {

    getHomes() {
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
        return fetch(baseURL + HOME_REST_API_URL + current_home.current_home(),{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res=>res.json());
    }

    
    addHome(client_id, name, address, city, state, zipcode) {
        return fetch(baseURL + "newhouse/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({ 
                name: name,
                address:address,
                state:state,
                city:city,
                zipCode:zipcode,
                admin: {id: client_id}
            })
        })
    }    
}

export default new HomeService();