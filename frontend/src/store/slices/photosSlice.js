import {createSlice} from "@reduxjs/toolkit";

const name = 'photos';

const initialState = {
    photos: [],
    personalPhotos: [],
    moderationPhotos: [],
    getPhotosLoading: false,
    getPhotosError: null,
    addPhotoLoading: false,
    addPhotoError: null,
    deletePhotoLoading: false,
    deletePhotoFailure: null,
    moderationPhotosLoading: false,
    moderationPhotosError: null,
    publishPhotoLoading: false,
    publishPhotoError: null,
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
        getPhotosModerationRequest(state) {
            state.moderationPhotosLoading = true;
        },
        getPhotosModerationSucess(state, {payload: photos}) {
            state.moderationPhotos = photos;
            state.moderationPhotosLoading = false;
        },
        getPhotosModerationFailure(state, {payload: error}) {
            state.moderationPhotosLoading = false;
            state.moderationPhotosError = error;
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
        addPhotoRequest(state) {
            state.addPhotoLoading = true;
        },
        addPhotoSuccess(state) {
            state.addPhotoLoading = false;
        },
        addPhotoFailure(state, {payload: error}) {
            state.addPhotoLoading = false;
            state.addPhotoError = error;
        },
        deletePhotoRequest(state) {
            state.deletePhotoLoading = true;
        },
        deletePhotoSuccess(state) {
            state.deletePhotoLoading = false;
        },
        deletePhotoFailure(state, {payload: error}) {
            state.deletePhotoLoading = false;
            state.deletePhotoFailure = error;
        },
        publishPhotoRequest(state) {
            state.publishPhotoLoading = true;
        },
        publishPhotoSuccess(state) {
            state.publishPhotoLoading = false;
        },
        publishPhotoFailure(state, {payload: error}) {
            state.publishPhotoLoading = false;
            state.publishPhotoError = error;
        },
    }
});

export default usersSlice;