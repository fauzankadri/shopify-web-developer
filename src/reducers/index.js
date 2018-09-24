import { combineReducers } from "redux";
import favouriteReducer from "./favouriteReducer";

export default combineReducers({
    favourites: favouriteReducer,
});