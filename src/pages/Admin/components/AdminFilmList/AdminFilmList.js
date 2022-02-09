import AdminFilmCard from "../AdminFilmCard/AdminFilmCard";

import "./admin-film-list.scss";

function AdminFilmList () {

    const data = [
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'},
        {title: 'Yellow Saller', time: '2 ч 49 мин', genre: 'Ужасы', year: '2022', url: 'https://static.okko.tv/images/v2/17117495'}
    ];

    return (
        <div className="admin-film-list">
            <AdminFilmCard cardInfo={false} />
            {data.map((film, id) => {
                return <AdminFilmCard key={id} cardInfo={film} />
            })}
        </div>
    )
}

export default AdminFilmList
