import React from "react";
import './Header.css'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));


export default () => {
    const classes = useStyles();

    const history = useHistory();
    const goHome = () => {
        history.push('/');
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" edge="start" className={classes.menuButton} onClick={goHome}>
                        <AttachMoneyIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Valiutų kursų portalas
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
