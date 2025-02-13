import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Landing(props) {
    const classes = useStyles();

    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        onClick={()=> window.location.href='/'}
                        style={{cursor: 'pointer'}}
                        variant="h6" className={classes.title}>
                        En-Bn.com
                    </Typography>
                    <Button href='/user/register' color="inherit">Register</Button>
                    <Button href='/app' color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}