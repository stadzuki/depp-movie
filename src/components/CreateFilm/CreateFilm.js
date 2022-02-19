import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as filmActions from "../../store/actions/film";
import NavLine from "../NavLine/NavLine";

import BasicOfferInfo from "./components/BasicOfferInfo";
import RequiredOfferInfo from "./components/RequiredOfferInfo";
import AdditionalOfferInfo from "./components/AdditionalOfferInfo";
import isOfferDataValid from "./shared/isOfferDataValid";
import OfferAlmostDone from "./components/OfferAlmostDone";
import OfferComplete from "./components/OfferComplete";

import "./create-film.scss"

function CreateFilm () {
    const tabs = [
        {tabPos: 0, title: 'Предложить проект', component: BasicOfferInfo},
        {tabPos: 1, title: 'Обязательные материалы', component: RequiredOfferInfo},
        {tabPos: 2, title: 'Дополнительные материалы', component: AdditionalOfferInfo},
        {tabPos: 3, title: 'Готово', component: OfferComplete},
        {tabPos: 4, title: 'Почти готово', component: OfferAlmostDone}
    ];

    const READY_STEP = +tabs[3].tabPos;
    const ALMOST_READY_STEP = +tabs[4].tabPos;

    const dispatch = useDispatch();
    const offerFilmInfo = useSelector((store) => store.film.offerFilm);
    const [currentTab, setCurrentTab] = useState(tabs[0]);

    function saveStepContent (key, data) {
        if (offerFilmInfo.hasOwnProperty(key) && JSON.stringify(offerFilmInfo[key]) !== JSON.stringify(data)) {
            dispatch(filmActions.offerFilm({[key]: data}));
        }
    }

    function nextStep (key, data) {
        if (currentTab.tabPos <= tabs.length - 1) {
            saveStepContent(key, data);

            currentTab.tabPos + 1 === READY_STEP
                ? completeStep()
                : setCurrentTab(() => tabs[currentTab.tabPos + 1]);

        }
    }

    function previousStep (key, data) {
        if (tabs[currentTab.tabPos - 1] !== undefined) {

            if (currentTab.tabPos === ALMOST_READY_STEP) {
                setCurrentTab(() => tabs[ALMOST_READY_STEP - 2])
                return;
            }

            saveStepContent(key, data);
            setCurrentTab(() => tabs[currentTab.tabPos - 1]);
        }
    }

    function completeStep (key, data) {
        if (key && data) saveStepContent(key, data);

        isOfferDataValid(offerFilmInfo.requiredInfo)
            ? setCurrentTab(() => tabs[READY_STEP])
            : setCurrentTab(() => tabs[ALMOST_READY_STEP]);
    }

    function CreateFilmContent () {
        const Content = currentTab.component;

        return <Content offerInfo={offerFilmInfo} saveStepContent={saveStepContent} loadNextStep={nextStep} loadPreviousStep={previousStep} loadCompleteStep={completeStep}/>
    }

    return (
        <div className="create-film create-film-container">
            {currentTab.tabPos === 3
                ? ''
                : <NavLine navItems={tabs} activeItemPos={currentTab.tabPos} setCurrentTab={setCurrentTab} loadCompleteStep={completeStep}/>
            }

            <CreateFilmContent />
        </div>
    )
}

export default CreateFilm
