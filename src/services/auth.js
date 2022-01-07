import $api, {API_URL} from "../http/http";
import axios from "axios";

class AuthService {
    static async login (login, password) {
        return $api.post(`${API_URL}/api/user/login`, {login, password})
    }

    static async checkIfTokenAvaliable () {
        return $api.get('/api/user/credentials');
    }

    static async registration (login, password, email) {
        return axios.post(`${API_URL}/api/user/register`, {login, password, email})
    }

    static async registrationByGoogle ({accessToken}) {
        return axios.get(`${API_URL}/api/user/google`, {
            headers: {'Authorization': accessToken}
        });
    }

    static async registrationByFacebook ({accessToken}) {
        return axios.get(`${API_URL}/api/user/facebook`, {
            headers: {'Authorization': accessToken}
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