import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../store/actions/photosActions";
import PhotoComponent from "../../components/PhotoComponent/PhotoComponent";
import ModalComponent from "../../components/UI/ModalComponent/ModalComponent";
import {Box} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import Preloader from "../../components/UI/Preloader/Preloader";

const useStyles = makeStyles()(() => ({
    photos: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}));

const Photos = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos.photos);
    const loading = useSelector(state => state.photos.getPhotosLoading);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalData, setModalData] = useState({
       image: '',
       title: '',
       author: ''
    });

    const handleModalOpen = (image, title, author) => {
        setModalData({image, title, author});

        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalData({image: '', title: '', author: ''});

        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            <ModalComponent
                modalOpen={modalOpen}
                handleClose={handleModalClose}
                image={modalData.image}
                titlePhoto={modalData.title}
                authorPhoto={modalData.author}
            />
            <Box className={classes.photos}>
                {!!photos.length ? photos.map(photo => (
                    <PhotoComponent
                        key={photo['_id']}
                        image={photo.image}
                        title={photo.title}
                        author={photo.author.displayName}
                        authorId={photo.author['_id']}
                        modalHandler={() => handleModalOpen(photo.image, photo.title, photo.author.displayName)}
                    />
                )) : null}
            </Box>
        </>
    );
};

export default Photos;