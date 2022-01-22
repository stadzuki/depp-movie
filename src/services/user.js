import $api, {API_URL} from "../http/http";
import axios from "axios";

class UserService {
    static async getUserProfileData () {
        return $api.get(`${API_URL}/api/user/userProfile`);
    }

    static async saveUserProfileData (userProfileData) {
        console.log(userProfileData)
        return $api.put(`${API_URL}/api/user/userProfile`, userProfileData);
    }

    static async changeUserPassword (passwords) {
        return $api.post(`${API_URL}/api/user/changePassword`, passwords)
    }
}

export default UserService
