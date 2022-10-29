import React, {useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";
import {addPhoto} from "../../store/actions/photosActions";

const AddPhotoForm = () => {
    const dispatch = useDispatch();

    const error = useSelector(state => state.photos.addPhotoError);
    const loading = useSelector(state => state.photos.addPhotoLoading);

    const [photoData, setPhotoData] = useState({
        title: '',
        image: ''
    });

    const inputChangeHandler = e => {
        const { name, value } = e.target;

        setPhotoData(prev => ({...prev, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setPhotoData(prev => ({...prev, [name]: file}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(photoData).forEach(key => {
            formData.append(key, photoData[key]);
        });

        dispatch(addPhoto(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth='md'>
            <Typography component="h1" variant="h5" textAlign='center' marginBottom='30px'>
                Add new photo
            </Typography>

            <Grid
                component="form"
                onSubmit={submitFormHandler}
                container
                spacing={3}
            >
                <FormElement
                    name='title'
                    label='Title'
                    required={true}
                    onChange={inputChangeHandler}
                    value={photoData.title}
                    error={getFieldError('title')}
                />

                <Grid item xs={12}>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
                        required={true}
                        error={getFieldError('image')}
                    />
                </Grid>

                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Create photo
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddPhotoForm;