import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const NOTIFICATIONS_REST_API_URL = "notifications/"

class NotificationService {

    async getTop5Notifications(home_id) {
        const res = await fetch(baseURL + (home_id + '/') + NOTIFICATIONS_REST_API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }

    async getAllNotifications(home_id) {
        const res = await fetch(baseURL + (home_id + '/') + NOTIFICATIONS_REST_API_URL + '?all=True', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: auth.token(),
            }
        });
        return await res.json();
    }
}

export default new NotificationService();