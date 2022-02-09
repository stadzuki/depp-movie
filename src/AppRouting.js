import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState, lazy, Suspense} from "react";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home/Home"));
const AboutFilm = lazy(() => import("./pages/AboutFilm/AboutFilm"));
const Portal = lazy(() => import("./pages/Portal/Portal"));
const PortalPost = lazy(() => import("./pages/PortalPost/PortalPost"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const OfferFilm = lazy(() => import("./pages/OfferFilm/OfferFilm"));


function AppRouting () {
    const userAuth = useSelector((store) => store.user.isAuth);
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(userAuth);
    }, [userAuth])

    function requireAuth (Component, props) {
        if (!isAuth && !userAuth) return <Redirect to="/auth"/>

        return <Component {...props}/>
    }

    function requireAdminAccess (Component, props) {
        // if (!isAuth && !userAuth && isUserAdmin) return <Redirect to="/404"/>

        return <Component {...props}/>
    }

    function HomeWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <Home {...props} />
            </Suspense>
        );
    }

    function AboutFilmWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <AboutFilm {...props} />
            </Suspense>
        )
    }

    function PortalWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <Portal {...props} />
            </Suspense>
        )
    }

    function PortalPostWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <PortalPost {...props} />
            </Suspense>
        )
    }

    function ProfileWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <Profile {...props} />
            </Suspense>
        )
    }

    function OfferFilmWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <OfferFilm {...props} />
            </Suspense>
        )
    }

    function AdminWrapper (props) {
        return (
            <Suspense fallback={<Loader/>}>
                <Admin {...props} />
            </Suspense>
        )
    }

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/:auth?" component={HomeWrapper}
                />
                <Route
                    path="/about_film/:id/:tab?"
                    render={(props) => requireAuth(AboutFilmWrapper, props)}
                />
                <Route
                    exact
                    path="/film/:filmId/portal/"
                    render={(props) => requireAuth(PortalWrapper, props)}
                />
                <Route
                    exact
                    path="/film/:filmId/portal/post/:postId/:tab?"
                    render={(props) => requireAuth(PortalPostWrapper, props)}
                />
                <Route
                    path="/user/:status?"
                    render={(props) => requireAuth(ProfileWrapper, props)}
                />
                <Route
                    exact
                    path="/panel/offer_film"
                    render={(props) => requireAuth(OfferFilmWrapper, props)}
                />
                <Route
                    exact
                    path="/panel/admin/:tab?"
                    render={(props) => requireAdminAccess(AdminWrapper, props)}
                />
                <Route component={NotFound} />
            </Switch>
            {/*<Route path="/:lang" component={SwitchLang}/>*/}
            {/*<Route */}
            {/*    path="/account/signin" */}
            {/*    component={AuntificateModal}*/}
            {/*/>*/}
        </Router>
    );
}

export default AppRouting
