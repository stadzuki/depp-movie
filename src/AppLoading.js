import {useEffect} from "react";
import {useDispatch} from "react-redux";
import * as action from "./store/actions/user";
import AuthService from "./services/auth";

function AppLoading () {
    const dispatch = useDispatch();

    useEffect(function () {
        const token = localStorage.getItem('token');
        if (token) {
            AuthService.checkIfTokenAvaliable(token)
                .then(async (response) => {
                    dispatch(action.changeUserAuntification(true));
                })
                .catch((error) => {
                    console.log('registation by google failed', error);
                })

        }
    }, [])

    return (
      <div className="dp-loader"></div>
    );
}

export default AppLoading