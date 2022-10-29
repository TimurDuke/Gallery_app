import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";

const PersonalPhoto = ({user, authorId, image, title, author, deleteHandler}) => {
    return (
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
            {user?._id === authorId ? <CardActions>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={deleteHandler}
                >
                    Delete photo
                </Button>
            </CardActions> : null}
        </Card>
    );
};

PersonalPhoto.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.object,
    authorId: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default PersonalPhoto;