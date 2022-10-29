import photosSlice from "../slices/photosSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addSuccessNotification} from "../../notifications";

const {
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosFailure,

    getPhotosModerationRequest,
    getPhotosModerationSucess,
    getPhotosModerationFailure,

    getPersonalPhotosRequest,
    getPersonalPhotosSuccess,
    getPersonalPhotosFailure,

    addPhotoRequest,
    addPhotoSuccess,
    addPhotoFailure,

    deletePhotoRequest,
    deletePhotoSuccess,
    deletePhotoFailure,

    publishPhotoRequest,
    publishPhotoSuccess,
    publishPhotoFailure,

    shareLinkRequest,
    shareLinkSucess,
    shareLinkFailure,

    getPhotoByLinkRequest,
    getPhotoByLinkSuccess,
    getPhotoByLinkFailure,
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

export const getModerationPhotos = () => {
    return async dispatch => {
        try {
            dispatch(getPhotosModerationRequest());

            const response = await axiosApi('/admin/moderation');

            if (response.data) {
                dispatch(getPhotosModerationSucess(response.data));
            }
        } catch (e) {
            dispatch(getPhotosModerationFailure(e));
        }
    };
};

export const addPhoto = photoData => {
    return async dispatch => {
        try {
            dispatch(addPhotoRequest());

            const response = await axiosApi.post('/photos', photoData);

            if (response.data && response.status === 200) {
                dispatch(addPhotoSuccess());
                dispatch(historyPush('/'));
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

export const deletePhoto = photoId => {
    return async dispatch => {
        try {
            dispatch(deletePhotoRequest());

            const response = await axiosApi.delete('/photos/' + photoId);

            if (response.data && response.status === 200) {
                dispatch(deletePhotoSuccess());
                dispatch(historyPush('/'));
                addSuccessNotification(response.data.message);
            }
        } catch (e) {
            dispatch(deletePhotoFailure(e));
        }
    };
};

export const publishPhoto = photoId => {
    return async dispatch => {
        try {
            dispatch(publishPhotoRequest());

            const response = await axiosApi.put('/admin/publishPhoto/' + photoId);

            if (response.data && response.status === 200) {
                dispatch(publishPhotoSuccess());
                dispatch(historyPush('/'));
                addSuccessNotification('The photo has been successfully published.');
            }
        } catch (e) {
            dispatch(publishPhotoFailure(e));
        }
    };
};

export const shareLink = photoId => {
    return async dispatch => {
        try {
            dispatch(shareLinkRequest());

            const { data } = await axiosApi.post('/image/' + photoId);

            if (data) {
                dispatch(shareLinkSucess());
            }
        } catch (e) {
            dispatch(shareLinkFailure(e));
        }
    };
};

export const getPhotoByLink = token => {
    return async dispatch => {
        try {
            dispatch(getPhotoByLinkRequest());

            const { data } = await axiosApi('/image?token=' + token);

            if (data) {
                dispatch(getPhotoByLinkSuccess(data));
            }

        } catch (e) {
            dispatch(getPhotoByLinkFailure(e));
        }
    };
};