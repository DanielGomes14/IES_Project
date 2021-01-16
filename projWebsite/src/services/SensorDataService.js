import baseURL from "./../data/base-url";
import { auth } from "../utils/auth";

const SENSORDATA_REST_API_URL = "sensordata/"

class SensorDataService {
    async getSensorData(div_id, start_date=undefined, end_date=undefined, types=undefined) {

        start_date = start_date.toISOString()
        end_date = end_date.toISOString()
        types = types.join(',');
        
        var api_url = baseURL + ('divisions/' + div_id + '/') + SENSORDATA_REST_API_URL

        if (start_date != undefined) {
            api_url  +=  '?start_date=' + start_date + '&end_date=' + end_date + '&types=' +  types;
        }
        
        console.log(api_url)

        const res = await fetch(api_url, {
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

export default new SensorDataService();