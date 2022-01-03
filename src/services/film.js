import axios from "axios";
import {API_URL} from "../http/http";

class FilmService {
    static async getFilms () {
        return axios.get(`${API_URL}/api/film/films`)
    }
}

export default FilmService