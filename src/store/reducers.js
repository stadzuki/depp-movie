import { combineReducers } from "redux";
import {user} from "./reducers/user";
import {film} from "./reducers/film";

// Собираем все редьюсеры в единый
export default combineReducers({
    user,
    film
});
