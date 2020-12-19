import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const NOTIFICATIONS_REST_API_URL = "notifications/"

class NotificationService {

    getNotifications(home_id) {
        return fetch(baseURL + (home_id + '/') + NOTIFICATIONS_REST_API_URL, {
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

export default new NotificationService();