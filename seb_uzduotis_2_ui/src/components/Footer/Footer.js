import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'No Copyright © '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">Hire this app creator</Typography>
                <Copyright />
            </Container>
        </footer>
    );
}
