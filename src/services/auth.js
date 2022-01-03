import $api, {API_URL} from "../http/http";
import axios from "axios";

class AuthService {
    static async login (login, password) {
        return $api.post(`${API_URL}/api/user/login`, {login, password})
    }

    static async checkIfTokenAvaliable (token) {
        return $api.post('/some_url', {token})
    }

    static async registration (login, password, email) {
        return axios.post(`${API_URL}/api/user/register`, {login, password, email})
    }

    static async testCock () {
        return $api.get(`${API_URL}/api/Film/test`)
    }

    static async registrationByGoogle ({accessToken}) {
        axios.get(`${API_URL}/api/user/google`, {
            headers: {
                'Authorization': accessToken
            }
        })
        .then((response) => {
            console.log('resp', response)
        })
        .catch((error) => {
            console.log('erro', error)
        })
    }

    static async registrationByFacebook ({accessToken}) {
        axios.get(`${API_URL}/api/user/facebook`, {
            headers: {
                'Authorization': accessToken
            }
        })
        .then((response) => {
            console.log('resp', response)
        })
        .catch((error) => {
            console.log('erro', error)
        })
    }

    static async registrationByTwitter (response) {
        console.warn('res', response)
    }

    static async registrationByVk (response) {

    }

    static async registrationByWechat (response) {

    }
}

export default AuthService