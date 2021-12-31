import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound";

function AppRouting () {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home">
                    <Redirect to="/" />
                </Route>
                <Route component={NotFound}></Route>
            </Switch>
            {/*<Route path="/:lang" component={SwitchLang}/>*/}
        </Router>
    );
}

export default AppRouting