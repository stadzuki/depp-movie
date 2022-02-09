import {useRef, useState} from "react";
import FilmDescription from "../../pages/AboutFilm/components/FilmDescription/FilmDescription";
import FilmCreator from "../../pages/AboutFilm/components/FilmCreator/FilmCreator";
import FilmReviews from "../../pages/AboutFilm/components/FilmReviews/FilmReviews";

import "./description-tab-ctrl.scss";

function DescriptionTabCtrl ({filmId, activeTab, history, tabData, firstTabData, secondTabData, thirdTabData, tabTitle, tabUrl}) {
    const navFilmDescRef = useRef();
    const [bottomContent, setBottomContent] = useState(activeTab|| 'description');

    function getBottomContent () {
        switch (bottomContent) {
            case 'description':
                return <FilmDescription film={firstTabData || tabData}/>
                break;
            case 'creators':
                return <FilmCreator film={secondTabData || tabData}/>
                break;
            case 'reviews':
                return <FilmReviews film={thirdTabData || tabData}/>
                break;
        }
    }

    function loadBottomContent (evt, component) {
        if (component === bottomContent) return 1;

        if (history) {
            history.push(`${tabUrl}${component}`);
        }


        const target = evt.currentTarget;
        const navItems = target.parentNode.childNodes;

        navItems.forEach(item => item.classList.remove('tab-active'));
        target.classList.add('tab-active');

        setBottomContent(component);
    }

    function defineTabData () {
        if (    activeTab === 'description' && (!tabData && !firstTabData)) {
            return (
                <div className="about-film__content__inner--no-content">Не удалось загрузить информацию или контент отсутсвует</div>
            )
        } else return getBottomContent()

        if (activeTab === 'creators' && (!tabData && !secondTabData)) {
            return (
                <div className="about-film__content__inner--no-content">Не удалось загрузить информацию или контент отсутсвует</div>
            )
        } else return getBottomContent()

        if (activeTab === 'reviews' && (!tabData && !thirdTabData)) {
            return (
                <div className="about-film__content__inner--no-content">Не удалось загрузить информацию или контент отсутсвует</div>
            )
        } else return getBottomContent()
    }

    return (
        <div className="about-film__content">
            <div className="about-film__content__tabs">
                <p
                    ref={navFilmDescRef}
                    className={`about-film__content__tabs__tab ${bottomContent === 'description' ? 'tab-active' : ''}`}
                    onClick={(evt) => loadBottomContent(evt, 'description')}
                >{tabTitle.firstTab}</p>
                <p
                    className={`about-film__content__tabs__tab ${bottomContent === 'creators' ? 'tab-active' : ''}`}
                    onClick={(evt) => loadBottomContent(evt, 'creators')}
                >{tabTitle.secondTab}</p>
                <p
                    className={`about-film__content__tabs__tab ${bottomContent === 'reviews' ? 'tab-active' : ''}`}
                    onClick={(evt) => loadBottomContent(evt, 'reviews')}
                >{tabTitle.thirdTab}</p>
            </div>
            <div className="about-film__content__inner">
                {defineTabData()}
            </div>
        </div>
    )
}

export default DescriptionTabCtrl
