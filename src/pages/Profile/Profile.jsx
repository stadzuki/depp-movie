import Header from "../../components/Header/Header";
import AsideNav from "../../components/AsideNav/AsideNav";
import Footer from "../../components/Footer/Footer";
import ProfileData from "./components/ProfileData/ProfileData";

import "./profile.scss";

function Profile () {
    const userNavItems = [
        {title: 'Данные профиля', url: '/user/profile'},
        {title: 'Кошелек DPA', url: '/user/wallet'},
        {title: 'Мои фильмы и сериалы', url: '/user/movies'},
        {title: 'Покупки в Фаншопе', url: '/user/purchases'},
        {title: 'Отложенные товары', url: '/user/hold_products'},
        {title: 'Корзина', url: '/user/cart'},
        {title: 'Обратиться к модераторам', url: '/user/contact_moderators'}
    ];

    const investorNavItems = [
        {title: 'Правила каб. инвестора', url: '/user/investor_rules'},
        {title: 'Анкета', url: '/user/investor_form'},
        {title: 'Кошелек инвестора', url: '/user/investor_wallet', disabled: true},
        {title: 'Документы', url: '/user/investor_documents'},
        {title: 'Отчеты', url: '/user/investor_reports'},
    ];

    return (
        <>
            <Header />
            <div className="profile main-container">
                <div className="profile__aside">
                    <div className="profile__aside__inner">
                        <AsideNav navItems={userNavItems} useRouting={true}/>
                    </div>
                    <div className="profile__aside__inner">
                        <AsideNav navItems={investorNavItems} useRouting={true}/>
                    </div>
                    <button className="profile__aside__button dp-button dp-button__color--gray">Отключить аккаунт инвестора</button>
                </div>
                <div className="profile__content">
                    <ProfileData/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Profile
