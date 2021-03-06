import AdminFilmList from "../AdminFilmList/AdminFilmList";
import AdminFilmCreator from "../AdminFilmCreator/AdminFilmCreator";
import CreateFilm from "../../../../components/CreateFilm/CreateFilm";

import "./admin-content-wrapper.scss"

function AdminContentWrapper ({activeTab}) {

    function ActiveTab () {
        switch (activeTab) {
            case 'all_films':
                return <AdminFilmList />
            case 'create_film':
                return <CreateFilm />
            case 'offer_film':
                return <AdminFilmCreator />
        }
    }

    return (
        <div className="admin-content-wrapper">
            <ActiveTab />
        </div>
    )
}

export default AdminContentWrapper
