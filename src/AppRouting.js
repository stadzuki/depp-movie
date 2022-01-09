import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./pages/NotFound";
import AboutFilm from "./pages/AboutFilm/AboutFilm";
import {useSelector} from "react-redux";
import AuntificateModal from "./components/Modals/AuntificateModal";
import {useEffect, useState, lazy, Suspense} from "react";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home/Home"));

function AppRouting () {
    const userAuth = useSelector((store) => store.user.isAuth);
    const [isAuth, setAuth] = useState(false);
    useEffect(() => {
        setAuth(userAuth);
    }, [userAuth])

    function requireAuth (Component, props) {
        console.warn('is auth auto load', isAuth);
        if (!isAuth && !userAuth) return <Redirect to="/account/signin"/>

        return <Component filmId={props.match.params.id}/>
    }

    function HomeComponent() {
        return (
            <Suspense fallback={<Loader/>}>
                <Home />
            </Suspense>
        );
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route exact path="/home">
                    <Redirect to="/" />
                </Route>
                <Route path="/about_film/:id" render={(props) => requireAuth(AboutFilm, props)}></Route>
                {/*<Route path="/about_film/:id" component={AboutFilm}></Route>*/}
                <Route path="/account/signin" component={AuntificateModal}></Route>
                <Route component={NotFound}></Route>
            </Switch>
            {/*<Route path="/:lang" component={SwitchLang}/>*/}
        </Router>
    );
}

export default AppRouting
