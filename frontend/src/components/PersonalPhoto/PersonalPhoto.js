import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Link, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";
import {addSuccessNotification} from "../../notifications";

const PersonalPhoto = ({modalOpen, user, authorId, image, title, author, deleteHandler, published, shareHandler, token}) => {
    const copyLink = () => {
        navigator.clipboard.writeText('http://localhost:3000/image?token=' + token);
        addSuccessNotification('Copied');
    };

    return (
        <Card sx={{width: '31%', margin: '0 20px 20px 0'}}>
            <CardMedia
                image={apiUrl + '/' + image}
                onClick={modalOpen}
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
                ? <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Button
                            variant='contained'
                            size='small'
                            color='error'
                            onClick={deleteHandler}
                        >
                            Delete photo
                        </Button>
                        {!published
                            ? <Typography
                                variant='h6'
                                textAlign='center'
                                color='red'
                                marginLeft='10px'
                            >
                                Unpublished
                            </Typography>
                            : null}
                    </Box>
                    {!published
                        ? !token
                            ? <Button
                                variant='contained'
                                size='small'
                                sx={{marginTop: '10px'}}
                                onClick={shareHandler}
                            >
                                Share link
                            </Button>
                            : <Link
                                onClick={copyLink}
                                marginTop='10px'
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '5px'
                                }}
                            >
                                http://localhost:3000/image?token={token}
                            </Link>
                        : null}
                </CardActions>
                : null}
        </Card>
    );
};

PersonalPhoto.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    shareHandler: PropTypes.func.isRequired,
    modalOpen: PropTypes.func.isRequired,
    published: PropTypes.bool.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
};

export default PersonalPhoto;