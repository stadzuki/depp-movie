import FilmService from "./FilmService";

export default class GlobalFiltersService {
    static forFilm = {
        getFilterFromServer: function (filtersData, setFiltersData, forceUpdate) {
            for (const filter of filtersData) {
                if (filter?.from_serve) {
                    filter.from_serve = false;

                    FilmService.getFilmCategories()
                        .then((response) => {
                            filter.filters = response.data;
                            FilmService.filmCategories = response;
                            setFiltersData(filtersData);
                            forceUpdate();
                        })
                        .catch((error) => {
                            console.error('cannot load film categories', error);
                        })

                    break;
                }
            }
        }
    }
}
