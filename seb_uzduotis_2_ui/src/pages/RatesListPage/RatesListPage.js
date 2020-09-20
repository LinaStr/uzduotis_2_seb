import React, {useEffect, useState} from "react"
import ratesApi from '../../api/ratesApi'
import {
    Table,
    Button,
    TablePagination,
    CircularProgress
} from '@material-ui/core'

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {Form, Formik} from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    filterDropdown: {
        minWidth: "400px",
        padding: theme.spacing(0, 2),
    },
    form: {
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
}));

export default () => {
    const classes = useStyles();

    const [ratesPage, setRatesPage] = useState({content: []});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);


    const [availableCcy, setAvailableCcy] = useState({content: [],});
    const [availableDates, setAvailableDates] = useState({content: [],});

    useEffect(() => {
        ratesApi.fetchRatesByCurrencyAndDate(page, rowsPerPage, ccy, date)
            .then(response => setRatesPage(response.data))
            .finally(() => setIsLoading(false));
        ratesApi.fetchCurrencyNames()
            .then(response => setAvailableCcy(response.data))
            .finally(() => setIsLoading(false));
        ratesApi.fetchCurrencyDates()
            .then(response => setAvailableDates(response.data))
            .finally(() => setIsLoading(false));
    }, [page, rowsPerPage])


    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
    }
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }
    const [initialState] = useState({
        currency: null,
        date: null,
    });

    const [ccy, setCcy] = React.useState(null);
    const [date, setDate] = React.useState(null);


    return (
        <Container maxWidth="lg">
            <Formik
                enableReinitialize={true}
                initialValues={initialState}
                onSubmit={values => {
                    setPage(0);
                    ratesApi.fetchRatesByCurrencyAndDate(page, rowsPerPage, ccy, date)
                        .then(resp => setRatesPage(resp.data));
                }}
            >
                {(props) => (
                    <Form id="product-form">
                        <div className={classes.form}>
                            <Autocomplete
                                className={classes.filterDropdown}
                                options={availableCcy}
                                value={ccy}
                                onChange={(event: any, newValue: string | null) => {
                                    setCcy(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Ccy" variant="outlined"/>}
                            />
                            <Autocomplete
                                className={classes.filterDropdown}
                                options={availableDates}
                                value={date}
                                onChange={(event: any, newValue: string | null) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Date" variant="outlined"/>}
                            />
                        </div>
                        <div className={classes.form}>
                            <Button variant="contained" color="primary" type="submit">Get rates</Button>
                        </div>
                    </Form>
                )
                }
            </Formik>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell>Rate (to EUR)</TableCell>
                            <TableCell>Rate registration date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading &&
                        <TableRow>
                            <TableCell>
                                <CircularProgress/>
                            </TableCell>
                        </TableRow>}
                        {
                            ratesPage.content.length > 0 ?
                                ratesPage.content.map(rate => (
                                    <TableRow key={rate.id}>
                                        <TableCell>{rate.currency}</TableCell>
                                        <TableCell>{rate.rate}</TableCell>
                                        <TableCell>{rate.date}</TableCell>
                                    </TableRow>
                                ))
                                : <TableCell>Pagal pasirinktus parametrus rezultatų nerasta</TableCell>
                        }
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[10, 50, 100]}
                        rowsPerPage={rowsPerPage}
                        count={ratesPage.totalElements}
                        page={page}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onChangePage={handleChangePage}
                    />
                </Table>
            </TableContainer>
        </Container>
    )
}

