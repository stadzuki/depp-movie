import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import * as filmActions from "../../store/actions/film"
import FilmService from "../../services/film";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FilmInfo from "./components/FilmInfo/FilmInfo";
import FilmDescription from "./components/FilmDescription/FilmDescription";
import FilmCreator from "./components/FilmCreator/FilmCreator";
import FilmReviews from "./components/FilmReviews/FilmReviews";
import DescriptionTabCtrl from "../../components/DescriptionTabCtrl/DescriptionTabCtrl";

import "./about-film.scss";

function AboutFilm (props) {
    const filmId = props.match.params.id || -1;

    const dispatch = useDispatch();
    const filmInfo = useSelector((store) => store.film.filmsInfo)

    const navFilmDescRef = useRef();
    const [bottomContent, setBottomContent] = useState(props.match.params.tab || 'description');

    const test = {
        "id": 1,
        "title": "Битва за JS",
        "description": "Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества; путешествуя за пределами нашей галактики, чтобы узнать есть ли у человечества будущее среди звезд.",
        "year": 2012,
        "time": "1 ч 30 мин",
        "director": "Nurmagomedov Khabib",
        "mainActors": "",
        "percentCollected": 40,
        "country": "Россия",
        "sound": "Русская",
        "totalBudget": 121233,
        "usaFees": 222,
        "totalFees": 2222,
        "russiaFees": 2313,
        "fundTotal": 20,
        "fundRaised": 8,
        "totalPremiere": "10.10.1003",
        "russiaPremiere": "10.10.1003",
        "ageRating": 1,
        "isImmersive": false,
        "photos": [
            {
                "id": 24,
                "url": "https://cloud.mail.ru/public/D1xJ/SYN1NJFWE"
            },
            {
                "id": 25,
                "url": "https://cloud.mail.ru/public/6czY/9zBCSWSJu"
            }
        ],
        "videos": [
            {
                "id": 26,
                "url": "https://cloud.mail.ru/public/Lseu/k3pkBciWh"
            }
        ],
        "donationStages": [
            {
                "id": 1,
                "title": "Сьемка",
                "dateTo": "12.12.2012"
            },
            {
                "id": 2,
                "title": "Сьемка2",
                "dateTo": "12.12.2012"
            },
            {
                "id": 3,
                "title": "Сьемка3",
                "dateTo": "12.12.2012"
            },
            {
                "id": 4,
                "title": "Сьемка4",
                "dateTo": "12.12.2012"
            },
            {
                "id": 5,
                "title": "Сьемка5",
                "dateTo": "12.12.2012"
            },
            {
                "id": 6,
                "title": "Сьемка6",
                "dateTo": "12.12.2012"
            }
        ],
        "categories": "ужасы, комедия",
        "creators": [
            {
                "title": "Автор",
                "id": "author",
                "data": [
                    {
                        "id": 1,
                        "fio": "Musk Elon",
                        "role": "Author",
                        "photoURL": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE",
                        "description": "Автор",
                        "url": "https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%81%D0%BA,_%D0%98%D0%BB%D0%BE%D0%BD"
                    }
                ]
            },
            {
                "title": "Режиссёр",
                "id": "director",
                "data": [
                    {
                        "id": 4,
                        "fio": "Nurmagomedov Khabib",
                        "role": "Director",
                        "photoURL": "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSOvs7ilCuEUv1uFFpoSr5N8wxYMdIOSr7thWIQXngs0bLjCoZUuuWbcyxaoVEM",
                        "description": "Актер",
                        "url": "https://ru.wikipedia.org/wiki/%D0%9D%D1%83%D1%80%D0%BC%D0%B0%D0%B3%D0%BE%D0%BC%D0%B5%D0%B4%D0%BE%D0%B2,_%D0%A5%D0%B0%D0%B1%D0%B8%D0%B1_%D0%90%D0%B1%D0%B4%D1%83%D0%BB%D0%BC%D0%B0%D0%BD%D0%B0%D0%BF%D0%BE%D0%B2%D0%B8%D1%87"
                    }
                ]
            },
            {
                "title": "Сценаристы",
                "id": "screenwriter",
                "data": [
                    {
                        "id": 3,
                        "fio": "Alan Nolan",
                        "role": "ScreenWriter",
                        "photoURL": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/2aeee5fd-2f79-4897-a1d2-eec29f666e35/360",
                        "description": "Режиссер",
                        "url": "https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D0%BB%D0%B0%D0%BD,_%D0%9A%D1%80%D0%B8%D1%81%D1%82%D0%BE%D1%84%D0%B5%D1%80"
                    }
                ]
            },
            {
                "title": "Художник постановщик",
                "id": "productiondesigner",
                "data": [
                    {
                        "id": 2,
                        "fio": "Maknuggets Connor",
                        "role": "ProductionDesigner",
                        "photoURL": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQjsw5A7vZtlPuqxW9dN38nFV2rLCcsKoeK6VD3Pu-rRwL-QIc",
                        "description": null,
                        "url": "https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%BA%D0%B3%D1%80%D0%B5%D0%B3%D0%BE%D1%80,_%D0%9A%D0%BE%D0%BD%D0%BE%D1%80"
                    }
                ]
            }
        ],
        "format": "16:9",
        "reviews": [
            {
                "id": 1,
                "label": "Эдуард Лимонов, Однако",
                "title": "Дешёвка никогда не станет прачкой",
                "description": "169 минут всё было скучно, моё мнение об этом фильме не очень и тд",
                "link": "https://www.google.com/",
                "imageURL": "https://m.media-amazon.com/images/I/41sa7YauzhL._SY445_.jpg"
            }
        ],
        "links": [
            {
                "title": "Facebook",
                "url": "facebook.com"
            },
            {
                "title": "YouTube",
                "url": "youtube.com"
            }
        ]
    }

    useEffect(() => {
        if (filmInfo[filmId]) return;

        FilmService.getFilm(filmId)
            .then((response) => {
                dispatch(filmActions.addFIlmInfo({id: response.data.id, data: response.data}))
            })
            .catch((error) => {
                // props.history.push('/404');
                console.error('cannot load film info', error)
            });
    }, [])

    return (
        <>
            <Header/>
            <div className="about-film about-film__wrapper main-container">
                <FilmInfo film={filmInfo[filmId]}/>
                <DescriptionTabCtrl
                    history={props.history}
                    activeTab={props.match.params.tab}
                    filmId={filmId}
                    tabData={filmInfo[filmId]}
                    tabTitle={{firstTab: 'Описание фильма', secondTab: 'Создатели', thirdTab: 'Рецензии'}}
                />
            </div>
            <Footer/>
        </>
    )
}

export default AboutFilm
