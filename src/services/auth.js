import $api from "../http/http";

class AuthService {
    static async login (login, password) {
        return $api.post('/login', {login, password})
    }

    static async checkIfTokenAvaliable (token) {
        return $api.post('/some_url', {token})
    }
}

export default AuthService