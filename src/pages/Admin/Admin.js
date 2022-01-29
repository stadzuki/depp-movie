import AsidePanel from "./components/AsidePanel/AsidePanel";
import AdminContentWrapper from "./components/AdminContentWrapper/AdminContentWrapper";

import "./admin.scss"

function Admin (props) {
    const activeTab = props.match.params.tab || 'create_film';

    const adminNavItems = [
        {title: 'Все фильмы', url: '/panel/admin/all_films'},
        {title: 'Создать фильм', url: '/panel/admin/create_film'},
        {title: 'Предложенные фильмы', url: '/panel/admin/offer_film'},
    ]

    return (
        <>
            {/*<AdminHeader />*/}
            <div className="admin admin-container">
                {/*<div className="aside-panel-wrapper">*/}
                {/*    <AsidePanel  asideItems={adminNavItems} />*/}
                {/*    <button className="aside-panel__button dp-button dp-button__default dp-button__color--gray">Выйти</button>*/}
                {/*</div>*/}
                <AdminContentWrapper activeTab={activeTab} />
            </div>
        </>
    )
}

export default Admin
