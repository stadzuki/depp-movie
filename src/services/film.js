import $api from "../http/http";

class FilmService {
    static async getFilms () {
        return $api.get('api/film/films')
    }
}

export default FilmService