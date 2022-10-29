import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPersonalPhotos} from "../../store/actions/photosActions";
import {Box, Button, Typography} from "@mui/material";
import PersonalPhoto from "../../components/PersonalPhoto/PersonalPhoto";
import {Link} from "react-router-dom";

const PersonalPhotos = ({match}) => {
    const dispatch = useDispatch();

    const personalPhotos = useSelector(state => state.photos.personalPhotos);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getPersonalPhotos(match.params.id));
    }, [dispatch, match.params.id]);

    const deletePhotoHandler = photoId => {

    };

    return (
        <>
            {!!personalPhotos.length
                ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '20px'}}>
                    <Typography variant='h5'>
                        {personalPhotos[0].author.displayName}'s gallery
                    </Typography>
                    {user?._id === match.params.id
                        ? <Button
                            variant='outliend'
                            color='primary'
                            component={Link}
                            to='/addPhoto'
                        >
                            Add new photo
                        </Button>
                        : null}
                </Box> : null}
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {!!personalPhotos.length ? personalPhotos.map(photo => (
                    <PersonalPhoto
                        key={photo['_id']}
                        image={photo.image}
                        title={photo.title}
                        author={photo.author.displayName}
                        authorId={photo.author['_id']}
                        user={user}
                        deleteHandler={() => deletePhotoHandler(photo['_id'])}
                    />
                )) : <h2 style={{textAlign: 'center'}}>You don't have any personal photos yet.</h2>}
            </Box>
        </>
    );
};

export default PersonalPhotos;