import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as action from "./store/actions/user";
import AuthService from "./services/auth";
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
                })
                .catch((error) => {
                    console.error('cannot authorize user', error);
                })
                .finally(() => {
                    setAppReady(true);
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
