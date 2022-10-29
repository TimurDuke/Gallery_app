import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePhoto, getPersonalPhotos, shareLink} from "../../store/actions/photosActions";
import {Box, Button, Typography} from "@mui/material";
import PersonalPhoto from "../../components/PersonalPhoto/PersonalPhoto";
import {Link} from "react-router-dom";
import Preloader from "../../components/UI/Preloader/Preloader";
import ModalComponent from "../../components/UI/ModalComponent/ModalComponent";

const PersonalPhotos = ({match}) => {
    const dispatch = useDispatch();

    const personalPhotos = useSelector(state => state.photos.personalPhotos);
    const loading = useSelector(state => state.photos.personalPhotosLoading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getPersonalPhotos(match.params.id));
    }, [dispatch, match.params.id]);

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
        setModalOpen(false);

        setModalData({image: '', title: '', author: ''});
    };

    const deletePhotoHandler = photoId => {
        dispatch(deletePhoto(photoId));
    };

    const shareLinkHandler = async photoId => {
        await dispatch(shareLink(photoId));
        await dispatch(getPersonalPhotos(match.params.id));
    };

    return (
        <>
            <ModalComponent
                modalOpen={modalOpen}
                handleClose={handleModalClose}
                image={modalData.image}
                titlePhoto={modalData.title}
                authorPhoto={modalData.author}
            />
            <Preloader
                showPreloader={loading}
            />
            <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: '20px'
                }}
            >
                {!!personalPhotos.length
                    ? <Typography variant='h5'>
                        {personalPhotos[0].author.displayName}'s gallery
                    </Typography>
                    : null}
                {user?._id === match.params.id
                    ? <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/addPhoto'
                    >
                        Add new photo
                    </Button>
                    : null}
            </Box>
            <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                {!!personalPhotos.length ? personalPhotos.map(photo => (
                    <PersonalPhoto
                        key={photo['_id']}
                        image={photo.image}
                        title={photo.title}
                        author={photo.author.displayName}
                        authorId={photo.author['_id']}
                        published={photo.published}
                        token={photo.token}
                        modalOpen={() => handleModalOpen(photo.image, photo.title, photo.author.displayName)}
                        user={user}
                        deleteHandler={() => deletePhotoHandler(photo['_id'])}
                        shareHandler={() => shareLinkHandler(photo['_id'])}
                    />
                )) : <h2 style={{textAlign: 'center'}}>You don't have any personal photos yet.</h2>}
            </Box>
        </>
    );
};

export default PersonalPhotos;