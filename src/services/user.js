import $api, {API_URL} from "../http/http";
import axios from "axios";

class UserService {
    static async getUserProfileData () {
        return $api.get(`/api/users/profile`);
    }

    static async saveUserProfileData (userProfileData) {
        return $api.put(`/api/users/profile`, userProfileData);
    }

    static async changeUserPassword (passwords) {
        return $api.post(`/api/user/changePassword`, passwords)
    }
}

export default UserService
