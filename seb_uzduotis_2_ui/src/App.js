import React from "react";
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from "./components/Menu";
import Content from "./components/Content";
import {BrowserRouter as Router} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";


function App() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        main: {
            // marginTop: theme.spacing(8),
            // marginBottom: theme.spacing(2),
            // marginLeft: theme.spacing(20),
            // marginRight: theme.spacing(20),
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Router>
                <Header/>
                <Menu/>
                <Content className={classes.main}/>
                <Footer/>
            </Router>
        </div>
    )
}

export default App;
