import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./pages/NotFound";
import AboutFilm from "./pages/AboutFilm/AboutFilm";
import {useSelector} from "react-redux";
import AuntificateModal from "./components/Modals/AuntificateModal";
import {useEffect, useState, lazy, Suspense} from "react";
import Loader from "./components/Loader";
import Portal from "./pages/Portal/Portal";
import Profile from "./pages/Profile/Profile";

const Home = lazy(() => import("./pages/Home/Home"));

function AppRouting () {
    const userAuth = useSelector((store) => store.user.isAuth);
    const [isAuth, setAuth] = useState(false);
    useEffect(() => {
        setAuth(userAuth);
    }, [userAuth])

    function requireAuth (Component, props) {
        // if (!isAuth && !userAuth) return <Redirect to="/home/auth"/>

        return <Component {...props}/>
    }

    function HomeComponent(props) {
        return (
            <Suspense fallback={<Loader/>}>
                <Home {...props} />
            </Suspense>
        );
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route path="/home/:auth?" component={HomeComponent}></Route>
                <Route path="/about_film/:id/:tab?" render={(props) => requireAuth(AboutFilm, props)}></Route>
                <Route path="/portal/:id" component={Portal}></Route>
                <Route path="/user/:status?" component={Profile}></Route>
                <Route path="/account/signin" component={AuntificateModal}></Route>
                <Route component={NotFound}></Route>
            </Switch>
            {/*<Route path="/:lang" component={SwitchLang}/>*/}
        </Router>
    );
}

export default AppRouting
