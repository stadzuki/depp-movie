import "./admin-film-card.scss"

function AdminFilmCard ({cardInfo}) {

    function EmptyCard () {
        return (
            <div className="admin-film-card--empty">
                <span className="admin-film-card--empty__text">+ Создать фильм</span>
            </div>
        )
    }

    function ContentCard () {
        return (
            <>
                <div className="admin-film-card__content">
                    <div className="admin-film-card__content__poster">
                        {cardInfo?.url
                            ? <img src={cardInfo.url} className="img-in-block" alt="film"/>
                            : <div className="img__pulg"></div>
                        }
                    </div>
                    <div className="admin-film-card__content__control-panel">
                        <ul className="admin-film-card__content__control-panel__list">
                            <li className="admin-film-card__content__control-panel__list__item">
                                <img src="/img/view.svg" alt="preview" width="25"/>
                            </li>
                            <li className="admin-film-card__content__control-panel__list__item">
                                <img src="/img/pencil.svg" alt="edit" width="25"/>
                            </li>
                            <li className="admin-film-card__content__control-panel__list__item">
                                <img src="/img/delete.svg" alt="delete" width="25"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="admin-film-card__description">{cardInfo.title || '-'} • {cardInfo.genre || '-'} • {cardInfo.year || '-'}</div>
            </>
        )
    }

    return (
        <div className="admin-film-card">
            {cardInfo
                ? <ContentCard />
                : <EmptyCard />
            }
        </div>
    )
}

export default AdminFilmCard
