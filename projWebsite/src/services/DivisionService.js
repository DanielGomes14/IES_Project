
const DIVISIONS_REST_API_URL = "METER URL PARA A API"

class DivisionService {

    getDivisions() {
        return fetch(DIVISIONS_REST_API_URL).then((res => res.json()))
    }
    
}

export default new DivisionService();