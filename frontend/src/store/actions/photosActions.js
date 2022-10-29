import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";

const {
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosFailure,
    getPersonalPhotosRequest,
    getPersonalPhotosSuccess,
    getPersonalPhotosFailure,
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