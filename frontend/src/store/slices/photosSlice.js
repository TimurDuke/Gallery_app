import {createSlice} from "@reduxjs/toolkit";

const name = 'user';

const initialState = {
    photos: [],
    personalPhotos: [],
    getPhotosLoading: false,
    getPhotosError: null,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        getPhotosRequest(state) {
            state.getPhotosLoading = true;
        },
        getPhotosSuccess(state, {payload: photos}) {
            state.getPhotosLoading = false;
            state.photos = photos;
        },
        getPhotosFailure(state, {payload: error}) {
            state.getPhotosLoading = false;
            state.getPhotosError = error;
        },
        getPersonalPhotosRequest(state) {
            state.getPhotosLoading = true;
        },
        getPersonalPhotosSuccess(state, {payload: photos}) {
            state.getPhotosLoading = false;
            state.personalPhotos = photos;
        },
        getPersonalPhotosFailure(state, {payload: error}) {
            state.getPhotosLoading = false;
            state.getPhotosError = error;
        },

    }
});

export default usersSlice;