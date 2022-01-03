import "./film-strip.scss"

function FilmStrip () {
    return (
        <div className="film-strip">
            <ul className="film-strip__cards">
                <li className="film-strip__cards__card card">
                    <div className="card__img-container">
                        <div className="card__type" title="Иммерсивный">
                            <img src="/img/bolt.svg" alt="bolt" width="20" height="20"/>
                        </div>
                        <img src="/img/film-mock.svg" alt="film"/>
                    </div>
                    <div className="card__text">
                        <p className="card__text__title film-card__title__text">Интерстеллар</p>
                        <p className="card__text__title__sub film-card__title__sub">
                            <span className="film-card__title__sub--year">2014</span>
                            <span className="film-card__title__sub--genre">Драма, детектив</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default FilmStrip