import { combineReducers } from "redux";
import {user} from "./reducers/user";

// Собираем все редьюсеры в единый
export default combineReducers({
    user
});