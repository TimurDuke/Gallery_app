import * as React from 'react';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div>
            <Grid container alignItems='center' justifyContent='center'
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: {xs: 'column', sm: 'row'}
                  }}
            >
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-haspopup="true"
                    size='large'
                    sx={{textTransform: 'capitalize'}}
                    component={Link}
                    to={'/users/' + user['_id']}
                >
                    Hello, {user.displayName}!
                </Button>
                <Button
                    variant='outlined'
                    color='inherit'
                    size='small'
                    onClick={() => dispatch(logoutUser())}
                >
                    Logout
                </Button>
            </Grid>
        </div>
    );
};

export default UserMenu;
