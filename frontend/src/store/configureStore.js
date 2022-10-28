import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";

const rootReducer = combineReducers({});

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
    preloadedState: persistedState
})

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

export default store;