import { imageReducer } from "./imageReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
    imageReducer:imageReducer
})