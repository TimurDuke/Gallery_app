import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";

const ModerationPhotoComponent = ({image, title, author, deleteHandler, published, publishHandler}) => (
    <Card sx={{width: '31%', margin: '0 20px 20px 0'}}>
        <CardMedia
            image={apiUrl + '/' + image}
            sx={{
                cursor: 'pointer',
                width: '100%',
                paddingTop: '80%',
                height: '50px'
            }}
        />
        <CardContent>
            <Typography variant='body1'>
                {title}
            </Typography>
            <Typography
                variant='h6'
            >
                By: {author}
            </Typography>
        </CardContent>
        <CardActions sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Button
                variant='outlined'
                color='error'
                onClick={deleteHandler}
            >
                Delete photo
            </Button>
            {!published
                ? <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: '15px'
                    }}
                >
                    <Typography variant='h6' textAlign='center' color='red'>
                        Unpublished
                    </Typography>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={publishHandler}
                    >
                        Publish
                    </Button>
                </Box>
                : null}
        </CardActions>
    </Card>
);

ModerationPhotoComponent.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    publishHandler: PropTypes.func.isRequired,
    published: PropTypes.bool.isRequired,
};

export default ModerationPhotoComponent;