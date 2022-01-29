import "./admin-film-creator.scss"
import Header from "../../../../components/Header/Header";
import NavLine from "../../../../components/NavLine/NavLine";
import {useState} from "react";

function AdminFilmCreator () {

    const [tabs, setTabs] = useState([
        {tabPos: 1, title: 'Предложить проект', url: '/'},
        {tabPos: 2, title: 'Обязательные материалы', url: '/'},
        {tabPos: 3, title: 'Дополнительные материалы', url: '/'},
        {tabPos: 4, title: 'Готово', url: '/'},
    ])

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    return (
        <>
            <Header />
            <div className="film-creator">
                <NavLine navItems={tabs} currentItem={currentTab}/>
            </div>
        </>
    )
}

export default AdminFilmCreator
