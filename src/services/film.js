import axios from "axios";
import $api, {API_URL} from "../http/http";

class FilmService {
    static async getFilms () {
        return axios.get(`${API_URL}/api/films/all`)
    }

    static async getFilm (id) {
        return $api.get(`/api/films/${id}`)
    }

    static async getFilmPortal (id) {
        return $api.get(`/api/films/${id}/portal`)
    }

    static async getFilmExtraPost (id) {
        return $api.get(`/api/films/${id}/portalPost`)
    }

    static sendOfferFilm () {
        return
    }
}

export default FilmService
