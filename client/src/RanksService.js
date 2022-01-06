import axios from 'axios'

axios.defaults.baseURL = 'api/ranks/'

class RanksService {
    static getRanks() {
        return axios.get("universal-ranks").then(response => response.data)
    }
}

export default RanksService