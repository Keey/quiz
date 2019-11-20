import {combineReducers} from "redux";
import quizReucer from "./quiz";
import createReducer from "./create";
import createAuth from "./auth";

export default combineReducers({
    quiz: quizReucer,
    create: createReducer,
    auth: createAuth
})