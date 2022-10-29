import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePhoto, getModerationPhotos, publishPhoto} from "../../store/actions/photosActions";
import {Box} from "@mui/material";
import ModerationPhotoComponent from "../../components/ModerationPhotoComponent/ModerationPhotoComponent";
import Preloader from "../../components/UI/Preloader/Preloader";

const ModerationPage = () => {
    const dispatch = useDispatch();

    const moderationPhotos = useSelector(state => state.photos.moderationPhotos);
    const photosLoading = useSelector(state => state.photos.moderationPhotosLoading);
    const publishLoading = useSelector(state => state.photos.publishPhotoLoading);

    useEffect(() => {
        dispatch(getModerationPhotos());
    }, [dispatch]);

    const deletePhotoHandler = photoId => {
        dispatch(deletePhoto(photoId));
    };

    const publishPhotoHandler = photoId => {
        dispatch(publishPhoto(photoId));
    };

    return (
        <>
            <Preloader
                showPreloader={photosLoading || publishLoading}
            />
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                {!!moderationPhotos.length ? moderationPhotos.map(photo => (
                    <ModerationPhotoComponent
                        key={photo['_id']}
                        image={photo.image}
                        author={photo.author.displayName}
                        title={photo.title}
                        deleteHandler={() => deletePhotoHandler(photo['_id'])}
                        publishHandler={() => publishPhotoHandler(photo['_id'])}
                        published={photo.published}
                    />
                )) : <h2 style={{textAlign: 'center'}}>There are no photos yet.</h2>}
            </Box>
        </>
    );
};

export default ModerationPage;