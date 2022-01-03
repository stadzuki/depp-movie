import {useEffect} from "react";
import AuthService from "./services/auth";
import * as actions from "./store/actions/user";
import {useDispatch} from "react-redux";

function AppLoading () {
    const dispatch = useDispatch();

    useEffect(function () {
        const token = localStorage.getItem('token');
        if (token) {
            AuthService.checkIfTokenAvaliable(token)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    dispatch(actions.changeUserAuntification(true))
                })
                .catch((error) => {
                    console.error('auntification error', error);
                })
        }
    }, [])

    return (
      <div className="dp-loader"></div>
    );
}

export default AppLoading