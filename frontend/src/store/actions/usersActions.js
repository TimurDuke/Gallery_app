import usersSlice from "../slices/usersSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addFailureNotification, addSuccessNotification} from "../../notifications";

const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    logoutUserRequest,
} = usersSlice.actions;

export const {
    clearLoginErrors,
    clearRegisterErrors
} = usersSlice.actions;

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', userData);

            if (response.data) {
                dispatch(registerUserSuccess(response.data));
            }

            if (response.status === 200) {
                addSuccessNotification('You have successfully registred!');
                dispatch(historyPush('/'));
            }
        } catch (e) {
            addFailureNotification('Register failed!');
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            if (response.data) {
                dispatch(loginUserSuccess(response.data));
            }

            if (response.status === 200) {
                addSuccessNotification('You have successfully login!');
                dispatch(historyPush('/'));
            }
        } catch (e) {
            addFailureNotification('Login failed!');
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const facebookLogin = fbUserData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/facebookLogin', fbUserData);

            if (response.data) {
                dispatch(loginUserSuccess(response.data));
                dispatch(historyPush('/'));
            }

            if (response.status === 200) {
                addSuccessNotification('You have successfully login!');
            }
        } catch (e) {
            dispatch(loginUserFailure(e.response.data));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};

            await axiosApi.delete('/users/sessions', {headers});

            dispatch(logoutUserRequest());
            dispatch(historyPush('/'));
        } catch (e) {
            console.error(e);
        }
    }
};