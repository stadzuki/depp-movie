import axios from "axios";
import $api, {API_URL} from "../http/http";

class FilmService {
    static async getFilms () {
        return axios.get(`${API_URL}/api/film/films`)
    }

    static async getFilm (id) {
        return $api.get(`${API_URL}/api/film/${id}`)
    }
}

export default FilmService
