import {NavLink} from "react-router-dom";

import "./footer.scss"
import {useEffect, useRef} from "react";

function Footer () {
    const footerRef = useRef();

    // useEffect(() => {
    //     const htmlNode = document.querySelector('html');
    //     const rootNode = document.querySelector('#root');
    //
    //     if (htmlNode.clientHeight > rootNode.clientHeight) {
    //         footerRef.current.classList.add('footer--sticky');
    //     } else {
    //         footerRef.current.classList.remove('footer--sticky');
    //     }
    // })

    return (
        <footer ref={footerRef} className="footer main-container">
            <ul className="footer__nav">
                <li className="footer__nav__item">
                    <a href="https://facebook.com">Facebook</a>
                </li>
                <li className="footer__nav__item">
                    <a href="https://twitter.com">Twitter</a>
                </li>
                <li className="footer__nav__item">
                    <a href="https://instagram.com">Instagram</a>
                </li>
                <li className="footer__nav__item">
                    <a href="https://vk.com">VK</a>
                </li>
                <li className="footer__nav__item">
                    <a href="https://google.com">Weibo</a>
                </li>
            </ul>
            <ul className="footer__nav">
                <li className="footer__nav__item">
                    <NavLink to="/offer" className="footer__nav__item--opacity">Пользовательское соглашение</NavLink>
                </li>
                <li className="footer__nav__item footer__nav__item--opacity">Разработка продукта — GLYF</li>
                <li className="footer__nav__item footer__nav__item--opacity">Права принадлежат Immersive Media Techologies</li>
                <li className="footer__nav__item footer__nav__item--opacity">© 2019 Deep.Movie</li>
            </ul>
        </footer>
    );
}

export default Footer
