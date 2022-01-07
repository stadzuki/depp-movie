import "./film-reviews.scss"

function FilmReviews () {
    return (
        <div className="film-reviews info-content">
            <ul className="film-reviews__items">
                <li className="film-reviews__items__item">
                    <div className="film-reviews__items__item__logo">
                        <img src="/img/mock-reviews.svg" className="img-in-block" alt="review company logo"/>
                    </div>
                    <div className="info-content__inner__block info-content__inner__block--without-margin" id="plot">
                        <p className="info-content__inner__block__under-title">Милослав Чемоданов, The Village</p>
                        <p className="info-content__inner__block__title">Трёхчасовой эпос</p>
                        <p className="info-content__inner__block__description info-content__inner__block__description--mx-550">
                            Впрочем, Ноланы мало ориентируются на зрителя, которому становится скучно,
                            как только заканчивается попкорн. Они снимают великое кино, которое запихивать
                            в 90-минутный формат практически невозможно и точно незачем.
                        </p>
                        <a href="#" className="dp-button__action">Полная рецензия</a>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default FilmReviews
