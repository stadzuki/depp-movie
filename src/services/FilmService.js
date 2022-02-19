import axios from "axios";
import $api, {API_URL} from "../http/http";

class FilmService {
    static filmCategories = null;
    static films = null;

    static async getFilms() {
        if (this.films) return new Promise((resolve, reject) => {
            resolve(this.films);
        });

        return axios.post(`${API_URL}/api/films/all`, {});
    }

    static async getFilm(id) {
        return $api.get(`/api/films/${id}`);
    }

    static async getFilmPortal(id) {
        return $api.get(`/api/films/${id}/portal`);
    }

    static async getFilmExtraPost(id) {
        return $api.get(`/api/films/${id}/portalPost`);
    }

    static async getFilmCategories(data) {
        if (this.filmCategories) return new Promise((resolve, reject) => {
            resolve(this.filmCategories);
        });

        return $api.get('/api/films/categories', data);
    }

    static async getFilmsByFilters(data) {
        return axios.post(`${API_URL}/api/films/all`, data);
    }

    static async getFilmByName(name) {
        return axios.post(`${API_URL}/api/films/all`, {name});
    }

    static sendOfferFilm() {
        return;
    }
}

export default FilmService
