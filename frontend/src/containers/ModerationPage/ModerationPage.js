import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePhoto, getModerationPhotos} from "../../store/actions/photosActions";
import {Box} from "@mui/material";
import ModerationPhotoComponent from "../../components/ModerationPhotoComponent/ModerationPhotoComponent";

const ModerationPage = () => {
    const dispatch = useDispatch();

    const moderationPhotos = useSelector(state => state.photos.moderationPhotos);
    const loading = useSelector(state => state.photos.moderationPhotosLoading);

    useEffect(() => {
        dispatch(getModerationPhotos());
    }, [dispatch]);

    const deletePhotoHandler = photoId => {
        dispatch(deletePhoto(photoId));
    };

    const publishPhotoHandler = photoId => {
        console.log(photoId);
    };

    return (
        <>
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