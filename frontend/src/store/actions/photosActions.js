import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";

const {
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosFailure,
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