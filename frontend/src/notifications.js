import {toast} from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored'
};

export const addSuccessNotification = message => {
    return toast.success(message, {...options});
};

export const addFailureNotification = message => {
    return toast.error(message, {...options});
};