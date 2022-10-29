import React from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

const PhotoComponent = ({authorId, image, title, author, modalHandler}) => {
    return (
        <Card sx={{width: '31%', margin: '0 20px 20px 0'}}>
            <CardMedia
                image={apiUrl + '/' + image}
                onClick={modalHandler}
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
                    component={Link}
                    to={'/users/' + authorId}
                >
                    By: {author}
                </Typography>
            </CardContent>
        </Card>
    );
};

PhotoComponent.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    modalHandler: PropTypes.func.isRequired,
};

export default PhotoComponent;