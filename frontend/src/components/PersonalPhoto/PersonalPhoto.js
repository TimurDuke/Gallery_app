import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";

const PersonalPhoto = ({user, authorId, image, title, author, deleteHandler, published}) => (
    <Card sx={{width: '31%', marginRight: '20px'}}>
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
        {user?._id === authorId || user?.role === 'admin'
            ? <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={deleteHandler}
                >
                    Delete photo
                </Button>
                {!published
                    ? <Typography variant='h6' textAlign='center' color='red'>
                        Unpublished
                    </Typography>
                    : null}
            </CardActions>
            : null}
    </Card>
);

PersonalPhoto.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    published: PropTypes.bool.isRequired,
    user: PropTypes.object,
};

export default PersonalPhoto;