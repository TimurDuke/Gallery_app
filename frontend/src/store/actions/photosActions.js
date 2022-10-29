import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addSuccessNotification} from "../../notifications";

const {
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosFailure,

    getPersonalPhotosRequest,
    getPersonalPhotosSuccess,
    getPersonalPhotosFailure,

    addPhotoRequest,
    addPhotoSuccess,
    addPhotoFailure,
} = photosSlice.actions;

export const getPhotos = () => {
    return async dispatch => {
        try {
            dispatch(getPhotosRequest());

            const { data } = await axiosApi('/photos');

            if (data) {
                dispatch(getPhotosSuccess(data));
            }
        } catch (e) {
            dispatch(getPhotosFailure(e));
        }
    };
};

export const getPersonalPhotos = authorId => {
    return async dispatch => {
        try {
            dispatch(getPersonalPhotosRequest());

            const { data } = await axiosApi('/photos?author=' + authorId);

            if (data) {
                dispatch(getPersonalPhotosSuccess(data));
            }
        } catch (e) {
            dispatch(getPersonalPhotosFailure(e));
        }
    };
};

export const addPhoto = photoData => {
    return async dispatch => {
        try {
            dispatch(addPhotoRequest());

            const response = await axiosApi.post('/photos', photoData);

            if (response.data) {
                dispatch(addPhotoSuccess());
                dispatch(historyPush('/'));
            }

            if (response.status === 200) {
                addSuccessNotification('Photo successfully created');
            }
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addPhotoFailure(e.response.data));
            } else {
                dispatch(addPhotoFailure({global: "No internet"}));
            }
        }
    };
};