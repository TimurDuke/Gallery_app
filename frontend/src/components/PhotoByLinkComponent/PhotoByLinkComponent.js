import React from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";

const PhotoByLinkComponent = ({image, title, author}) => (
    <Card sx={{width: '80%', margin: '0 20px 20px 0'}}>
        <CardMedia
            image={apiUrl + '/' + image}
            sx={{
                width: '100%',
                paddingTop: '30%',
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
    </Card>
);

PhotoByLinkComponent.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default PhotoByLinkComponent;