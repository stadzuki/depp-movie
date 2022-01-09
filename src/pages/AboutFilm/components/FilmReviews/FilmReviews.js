import "./film-reviews.scss"
import {useEffect, useState} from "react";

function FilmReviews ({film}) {
    const [filmInfo, setFilmInfo] = useState({reviews: []});

    useEffect(() => {
        if (film) setFilmInfo(film)
    }, [film])

    return (
        <div className="film-reviews info-content">
            {filmInfo.reviews.length
                ? <ul className="film-reviews__items">
                    {filmInfo.reviews.map((review, idx) => {
                        return (
                            <li key={idx} className="film-reviews__items__item">
                                <div className="film-reviews__items__item__logo">
                                    <img src={review?.imageURL} className="img-in-block" alt="review company logo"/>
                                </div>
                                <div className="info-content__inner__block info-content__inner__block--without-margin">
                                    <p className="info-content__inner__block__under-title">{review.label}</p>
                                    <p className="info-content__inner__block__title">{review.title}</p>
                                    <p
                                        className="info-content__inner__block__description info-content__inner__block__description--mx-550"
                                    >{review.description}</p>
                                    <a href={review.link} className="dp-button__action dp-text__blue--arrow-link">Полная рецензия</a>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                : <p style={{margin: "50px auto"}}>Не удалось загрузить рецензии или они отсутсвуют</p>
            }
        </div>
    )
}

export default FilmReviews
