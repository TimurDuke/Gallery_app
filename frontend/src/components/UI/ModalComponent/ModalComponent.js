import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Modal, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../../config";

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = ({modalOpen, handleClose, image, titlePhoto, authorPhoto}) => {
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <CardMedia
                    image={apiUrl + '/' + image}
                    sx={{
                        width: '100%',
                        paddingTop: '60%',
                        height: '90px'
                    }}
                />
                <CardContent>
                    <Typography variant='body1'>
                        {titlePhoto}
                    </Typography>
                    <Typography
                        variant='h6'
                    >
                        By: {authorPhoto}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={handleClose}
                    >
                        Close modal
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

ModalComponent.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    image: PropTypes.string,
    titlePhoto: PropTypes.string,
    authorPhoto: PropTypes.string,
};

export default ModalComponent;