import React, {useEffect, useRef, useState} from "react";
import AsideNav from "../../../../components/AsideNav/AsideNav";

function FilmCreator ({film}) {
    const [filmInfo, setFilmInfo] = useState([]);

    const navItems = React.createRef();
    const creators = useRef();

    useEffect(() => {
        window.addEventListener('scroll', defineNavItem);

        return () => {
            window.removeEventListener('scroll', defineNavItem);
        };
    }, [navItems])

    useEffect(() => {
        if(film) {
            setFilmInfo(film?.creators)
        }
    }, [film])

    function defineNavItem () {
        if (window.isScrolling) return;

        const HEADER_HEIGHT = 65;
        const scrollTop = window.scrollY;
        const creatorsWrapper = document.querySelector('.about-film__content').offsetTop;

        const navChildren = navItems.current?.childNodes || [];

        if (creators.current && creators.current.childNodes) {
            creators.current.childNodes.forEach((creator, id) => {
                if (
                    id === creators.current.childNodes.length - 1
                    && creator.offsetTop + creatorsWrapper - (creators.current.childNodes[id-1].clientHeight - HEADER_HEIGHT) <= scrollTop
                ) {
                    return navChildren.forEach((child) => {
                        child.classList.remove('nav-active');
                        navChildren[id].classList.add('nav-active');
                    });
                }

                if (creator.offsetTop + creatorsWrapper <= scrollTop) {
                    navChildren.forEach((child) => {
                        child.classList.remove('nav-active');
                        navChildren[id].classList.add('nav-active');
                    });
                }
            });
        }

    }

    return (
        <div className="film-creator info-content">
            <div className="info-content__nav">
                <AsideNav
                    ref={navItems}
                    navItems={filmInfo}
                    useRouting={false}
                />
            </div>
            {filmInfo && filmInfo.length
                ?
                <div ref={creators} className="info-content__inner">
                    {filmInfo.map((person, id) => {
                        return (
                            <div key={id} className="info-content__inner__block--flex" id={person.id}>
                                <p className="info-content__inner__block__title">{person.title}</p>
                                <div className="info-content__inner__block__persons">
                                    {person.data.map((pers, idx) => {
                                        return (
                                            <div key={idx} className="info-content__inner__block__person">
                                                <div className="info-content__inner__block__img">
                                                    {pers.photoURL
                                                        ? <img src={pers.photoURL} className="img-in-block"
                                                               alt={pers.fio}/>
                                                        : <div className="actor-img-plug"></div>
                                                    }
                                                </div>
                                                <a href={pers.url}
                                                   className="info-content__inner__block__description--actor">{pers.fio}</a>
                                                <p className="info-content__inner__block__description--actor-role">{pers.role}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                : <p style={{margin: "50px auto"}}>Не удалось загрузить информацию о создателях или они отсутсвуют</p>
            }
        </div>
    )
}

export default FilmCreator
