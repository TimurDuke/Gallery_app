import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography, Link} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    }
}));

const Register = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const error = useSelector(state => state.users.registerError);
    const registerLoading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        password: '',
        email: '',
        displayName: '',
        avatarImage: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser(prevState => ({...prevState, [name]: file}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });

        dispatch(registerUser(formData));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign up
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        name='email'
                        label='Email'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.email}
                        error={getFieldError('email')}
                    />

                    <FormElement
                        name='displayName'
                        label='Display Name'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.displayName}
                        error={getFieldError('displayName')}
                    />

                    <Grid item xs={12}>
                        <FileInput
                            label="Avatar Image"
                            name="avatarImage"
                            onChange={fileChangeHandler}
                            required={true}
                            error={getFieldError('avatarImage')}
                        />
                    </Grid>

                    <FormElement
                        name='password'
                        label='Password'
                        type='password'
                        required={true}
                        onChange={inputChangeHandler}
                        value={user.password}
                        error={getFieldError('password')}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={registerLoading}
                            disabled={registerLoading}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;