import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound";
import AboutFilm from "./pages/AboutFilm/AboutFilm";

function AppRouting () {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home">
                    <Redirect to="/" />
                </Route>
                <Route path="/about_film/:id" component={AboutFilm}></Route>
                <Route component={NotFound}></Route>
            </Switch>
            {/*<Route path="/:lang" component={SwitchLang}/>*/}
        </Router>
    );
}

export default AppRouting
