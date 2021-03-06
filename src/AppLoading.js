import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import * as action from "./store/actions/user";
import AuthService from "./services/AuthService";
import AppRouting from "./AppRouting";
import Loader from "./components/Loader";

function AppLoading () {
    const dispatch = useDispatch();
    const [isAppReady, setAppReady] = useState(false);

    useEffect(function () {
        const token = localStorage.getItem('token');
        if (token) {
            AuthService.checkIfTokenAvaliable()
                .then((response) => {
                    dispatch(action.changeUserAuntification(true));
                    setAppReady(true);
                })
                .catch((error) => {
                    dispatch(action.changeUserAuntification(false));
                    setAppReady(true);
                    console.error('cannot authorize user', error);
                })
        } else {
            dispatch(action.changeUserAuntification(false));
            setAppReady(true);
        }
    }, [])

    return (
        isAppReady
            ? <AppRouting/>
            : <Loader/>
    );
}

export default AppLoading
