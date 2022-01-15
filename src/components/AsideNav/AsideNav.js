import React, {useEffect, useRef, useState} from "react";
import "./aside-nav.scss";
import {NavLink} from "react-router-dom";

const AsideNav = React.forwardRef(({navItems, useRouting, dataForScroll}, ref) => {
    const [isAnchorsLoaded, setAnchorsLoaded] = useState(false);

    useEffect(() => {
        if (isAnchorsLoaded) return;
        const anchors = document.querySelectorAll('.nav-list__anchor[href*="#"]');

        for (let anchor of anchors) {
            anchor.addEventListener('click', (e) => smoothScroll(e, anchor))
        }

        if (anchors.length) {
            setAnchorsLoaded(true);
        }

        return () => {
            for (let anchor of anchors) {
                anchor.removeEventListener('click', (e) => smoothScroll(e, anchor))
            }
        }
    });

    function smoothScroll (e, anchor) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        window.isScrolling = true;

        setTimeout(() => {
            window.isScrolling = false;
        }, 300)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })

        onNavigationClick(e);
    }

    function onNavigationClick (evt) {
        const target = evt.currentTarget.parentNode;
        const navChildren = target.parentNode.childNodes;

        navChildren.forEach((navItem) => {
            navItem.classList.remove('nav-active');
        })

        target.classList.add('nav-active');
    }

    return (
        <ul ref={ref} className="nav-list">
            {navItems
                ? navItems.map((navItem, id) => {
                    return (
                        <li key={id} className={`nav-list__item ${id === 0 ? 'nav-active' : ''}`}>
                            {useRouting
                                ? <NavLink
                                    className={`nav-list__anchor ${navItem?.disabled ? 'nav-list__anchor--disabled' : ''}`}
                                    to={navItem.url} onClick={onNavigationClick}
                                >{navItem.title}</NavLink>
                                : <a
                                    className={`nav-list__anchor ${navItem?.disabled ? 'nav-list__anchor--disabled' : ''}`}
                                    href={`#${navItem.id}`}>{navItem.title}</a>
                            }
                        </li>
                    )
                })
                : ''
            }
        </ul>
    )
});

export default AsideNav
