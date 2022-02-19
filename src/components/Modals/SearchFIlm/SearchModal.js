import {useRef, useState} from "react";
import FilmService from "../../../services/FilmService";
import FilmStrip from "../../../pages/Home/components/FilmStrip/FilmStrip";
import PerfectScrollbar from "react-perfect-scrollbar";

import "./search-modal.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

function SearchModal({close}) {
    const [searchedFilm, setSearchedFilm] = useState('');
    const [films, setFilms] = useState([]);
    const [filmNotFound, setFilmNotFount] = useState(false);
    const REQUEST_DEBOUNCE = 500;
    const requestTimer = useRef(null);

    function searchFilm(evt) {
        const target = evt.target;

        if (requestTimer.current) {
            clearTimeout(requestTimer.current);
        }

        requestTimer.current = setTimeout(() => {
            FilmService.getFilmByName(target.value)
                .then((response) => {
                    if (response.data && response.data.length) {
                        setFilms(response.data);
                        setFilmNotFount(false);
                    } else {
                        setFilmNotFount(true);
                    }
                })
                .catch((error) => {
                    console.error('cannot find film by name', error);
                    setFilmNotFount(true);
                })
            clearTimeout(requestTimer.current);
        }, REQUEST_DEBOUNCE);

        setSearchedFilm(target.value);
    }

    function clearSearch() {
        setSearchedFilm('');
        setFilms([]);
        setFilmNotFount(false);
    }

    return (
        <div className="search-modal">
            <div>
                <input className="search-modal__input" type="text" placeholder="Поиск по названию" value={searchedFilm} onChange={searchFilm}/>
                {searchedFilm
                    ? <span className="search-modal__clear-input" onClick={clearSearch}>
                        <img src="/img/remove-filter.svg" width={11} height={11}/>
                    </span>
                    : ''
                }
            </div>
            {films && films.length
                ? <div className="search-modal__content main-container">
                    <PerfectScrollbar>
                        <FilmStrip localStore={films} withOutScroll={true} close={close}></FilmStrip>
                    </PerfectScrollbar>
                </div>
                : filmNotFound ? <p style={{margin: "50px auto 0", opacity: 0.5}}>По Вашему запросу ничего не найдено</p> : ''
            }

            <button className="search-modal__close-button" onClick={close}>Закрыть</button>
        </div>
    )
}

export default SearchModal
