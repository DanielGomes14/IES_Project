import baseURL from "../data/base-url";
import { auth, current_home } from "../utils/auth";

const HOME_REST_API_URL = "homes/"
const INVITE_REST_API_URL = "invites"

class InviteService {  
   
    getHomeInvites(){
        if (!current_home.current_home())
            return [];
        return fetch(baseURL + HOME_REST_API_URL + current_home.current_home() + '/' + INVITE_REST_API_URL,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res => res.json());
    }

    inviteUser(email) {
        console.log(JSON.stringify({home: {id: current_home.current_home() }, invclient: {email: email}}))
        return fetch(baseURL + HOME_REST_API_URL  + INVITE_REST_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({home: {id: current_home.current_home() }, invclient: {email: email}}),
        }).then(res => res.json());
    }


    getMyInvites() {
        return fetch(baseURL + INVITE_REST_API_URL,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res => res.json());
    }

    acceptInvite(invite_id, client_id, invclient_id, home_id) {
        return fetch(baseURL + INVITE_REST_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            },
            body: JSON.stringify({id: invite_id, client: {id: client_id}, home: {id: home_id}, invclient: {id: invclient_id}}),
        }).then(res => res.json());
    }

    deleteHomeInvite(inv_id){
        return fetch(baseURL + HOME_REST_API_URL  + INVITE_REST_API_URL + '/' + inv_id,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res => res.json());
    }

    deleteReceivedInvite(inv_id){
        return fetch(baseURL + INVITE_REST_API_URL + '/' + inv_id,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        }).then(res => res.json());
    }

}

export default new InviteService();