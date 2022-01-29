import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../store/actions/film";
import NavLine from "../NavLine/NavLine";
import BasicOfferInfo from "./components/BasicOfferInfo";

import "./create-film.scss"
import RequiredOfferInfo from "./components/RequiredOfferInfo";

function CreateFilm () {
    const tabs = [
        {tabPos: 1, title: 'Предложить проект', component: BasicOfferInfo},
        {tabPos: 2, title: 'Обязательные материалы', component: RequiredOfferInfo},
        {tabPos: 3, title: 'Дополнительные материалы', component: '/'},
        {tabPos: 4, title: 'Готово', component: '/'}
    ];

    const dispatch = useDispatch();
    const offerFilmInfo = useSelector((store) => store.film.offerFilm);

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    function saveContent (key, data) {
        dispatch(filmActions.offerFilm({[key]: data}))
    }

    function nextStep () {
        if (currentTab.tabPos < tabs.length) {
            setCurrentTab(() => tabs[currentTab.tabPos])
        }
    }

    function CreateFilmContent () {
        const Content = currentTab.component;

        return <Content offerInfo={offerFilmInfo} saveContent={saveContent} goNext={nextStep}/>
    }

    return (
        <div className="create-film create-film-container">
            <NavLine navItems={tabs} activeItemPos={currentTab.tabPos} setCurrentTab={setCurrentTab}/>
            <CreateFilmContent />
        </div>
    )
}

export default CreateFilm
