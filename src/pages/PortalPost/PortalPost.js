import "./portal-post.scss"
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import DescriptionTabCtrl from "../../components/DescriptionTabCtrl/DescriptionTabCtrl";
import {useEffect, useState} from "react";
import FilmService from "../../services/film";

function PortalPost (props) {
    const postId = props.match.params.postId || -1;
    const filmId = props.match.params.filmId;

    const [postContent, setPostContent] = useState(null);

    useEffect(() => {
        FilmService.getFilmExtraPost(postId)
            .then((response) => {
                setPostContent(response.data);
            })
            .catch((error) => {
                console.error('cannot load film portal post', error)
            })
    }, [])

    return (
        <>
            <Header/>
            {/*TODO: split film video/photo in one component*/}
            <div className="portal-post main-container">
                <div className="film-info">
                    <div className="film-info__gallery">
                        <div className="film-info__gallery__screen">
                            {postContent && postContent.poster
                                ? postContent.poster.posterType === 'video'
                                    ? <video src={postContent.poster.url} poster={postContent.poster.previewImage} controls={true} className="img-in-block">
                                        Ваш браузер не поддерживает видео
                                    </video>
                                    : <img src={postContent.poster.url} className="img-in-block" alt="film"/>
                                : <div className="img__pulg"></div>
                            }
                        </div>
                    </div>
                    <div className="film-info__description df-jc-start">
                        <div className="film-info__description__title">
                            <p className="film-info__description__title__text">{postContent && postContent.title ? postContent.title : '-'}</p>
                            <p className="film-info__description__title__sub-text">
                                {postContent && postContent.subTitle ? postContent.subTitle : '-'}. {postContent?.serialNumber}
                            </p>
                        </div>
                        <div className="film-info__description__content description-content--line">
                            <ul className="description-content--line__list">
                                <li className="description-content--line__list__item line-item">
                                    <p className="line-item__title">Автор</p>
                                    <p className="line-item__subtitle">{postContent && postContent.author ? postContent.author : '-'}</p>
                                </li>
                                <li className="description-content--line__list__item line-item">
                                    <p className="line-item__title">Вид</p>
                                    <p className="line-item__subtitle">{postContent && postContent.type ? postContent.type : '-'}</p>
                                </li>
                                <li className="description-content--line__list__item line-item">
                                    <p className="line-item__title">Формат</p>
                                    <p className="line-item__subtitle">{postContent && postContent.format ? postContent.format : '-'}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="film-info__banner">
                            {postContent && postContent.bannerURL
                                ? <a href={postContent.bannerURL}>
                                    <img className="img-in-block" src={postContent.bannerImageURL} alt="Poster banner"/>
                                </a>
                                : <div className="img__pulg"></div>
                            }
                        </div>
                        <div className="film-info__description__bottom-buttons mt-auto">
                            <Link to={'/'} className="navlink-button">
                                <div className="film-info__description__bottom-buttons__button dp-button__default dp-button__color--blue">Смотреть фильм</div>
                            </Link>
                            <Link  to={'/'} className="navlink-button">
                                <div className="film-info__description__bottom-buttons__button dp-button__default dp-button__color--gray">Поделиться</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <DescriptionTabCtrl
                    history={props.history}
                    activeTab={props.match.params.tab}
                    filmId={filmId}
                    firstTabData={postContent?.description || {}}
                    secondTabData={postContent?.creators || {}}
                    thirdTabData={postContent?.sponsor || {}}
                    tabTitle={{firstTab: 'Описание', secondTab: 'Создатели', thirdTab: 'О спонсоре'}}
                />
            </div>
        </>
    )
}

export default PortalPost
