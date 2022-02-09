import $api, {API_URL} from "../http/http";
import axios from "axios";

class AuthService {
    static async login (login, password) {
        return $api.post(`/api/users/login`, {login, password})
    }

    static async checkIfTokenAvaliable () {
        return $api.get('/api/users/credentials');
    }

    static async registration (login, password, email) {
        return axios.post(`${API_URL}/api/users/register`, {login, password, email})
    }

    static async registrationByGoogle ({accessToken}) {
        return axios.get(`${API_URL}/api/users/google`, {
            headers: {'Authorization': accessToken}
        });
    }

    static async registrationByFacebook ({accessToken}) {
        return axios.get(`${API_URL}/api/users/facebook`, {
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
