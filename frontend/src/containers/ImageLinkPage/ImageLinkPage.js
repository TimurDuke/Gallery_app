import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {addFailureNotification} from "../../notifications";
import {useDispatch, useSelector} from "react-redux";
import {getPhotoByLink} from "../../store/actions/photosActions";
import PhotoByLinkComponent from "../../components/PhotoByLinkComponent/PhotoByLinkComponent";

const ImageLinkPage = () => {
    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    const photo = useSelector(state => state.photos.photoByLink);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        if (!params.token) {
            addFailureNotification('Query parameters must contain a token.');
        } else {
            setToken(params.token);
        }

        if (token) {
            dispatch(getPhotoByLink(token));
        }
    }, [token]);

    return !!photo.length && (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <PhotoByLinkComponent
                image={photo[0].image}
                author={photo[0].author.displayName}
                title={photo[0].title}
            />
        </Box>
    );
};

export default ImageLinkPage;