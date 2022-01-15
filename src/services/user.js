import $api, {API_URL} from "../http/http";
import axios from "axios";

class UserService {
    static async getUserProfileData () {
        return $api.get(`${API_URL}/api/user/`);
    }
}

export default UserService
