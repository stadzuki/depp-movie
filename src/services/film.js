import axios from "axios";
import $api, {API_URL} from "../http/http";

class FilmService {
    static async getFilms () {
        return axios.get(`${API_URL}/api/film/films`)
    }

    static async getFilm (id) {
        return $api.get(`${API_URL}/api/film/${id}`)
    }

    static async getFilmPortal (id) {
        return $api.get(`${API_URL}/api/Film/${id}/portal`)
    }

    static async getFilmExtraPost (id) {
        return $api.get(`${API_URL}/api/Film/${id}/portalPost`)
    }
}

export default FilmService
