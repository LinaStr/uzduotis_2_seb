import React, {useEffect, useState} from "react"
import {Field, Form, Formik, ErrorMessage} from "formik";
import ratesApi from "../../api/ratesApi";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Button, CircularProgress, Table} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles((theme) => ({
    filterDropdown: {
        minWidth: "400px",
        padding: theme.spacing(0, 2),
    },
    form: {
        // display: "flex",
        alignItem: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
}));

// const createValidationSchema = Yup.object().shape({
//     amount: Yup.number()
//         .typeError('Must be a number')
//         .min(0.01, 'Amount must be bigger than 0.01')
//         .required('Amount is required'),
//     currencyFrom: Yup.string()
//         .required('Required'),
//     currencyTo: Yup.string()
//         .required('Required')
// })


export default () => {
    const classes = useStyles();

    const [initialState] = useState({
        ccyFrom: null,
        rateFrom: null,
        ccyTo: null,
        rateTo: null,
        amount: null,
        calculatedAmount: null,
    });
    const [availableCcy, setAvailableCcy] = useState({content: [],});


    const [ccyFrom, setCcyFrom] = React.useState(null);
    const [ccyTo, setCcyTo] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [exchangeTable, setExchangeTable] = useState({content: []});



    useEffect(() => {
        ratesApi.fetchCurrencyNames()
            .then(response => setAvailableCcy(response.data))
    }, [])

    return (
        <Container maxWidth="lg">
            <Formik
                initialValues={initialState}
                // validate={values => {
                //     const errors = {};
                //
                //     if (!values.currencyFrom) {
                //         errors.currencyFrom = 'Required!';
                //     }
                //
                //     if (!values.currencyFrom) {
                //         errors.currencyFrom = 'Required!'
                //     }
                //
                //     if (!values.amount) {
                //         errors.amount = 'Required!'
                //     } else if (isNaN(values.price)) {
                //         errors.amount = 'Must be a number';
                //     } else if (values.price < 0.01) {
                //         errors.amount = 'Must be bigger than 0.00'
                //     }
                //
                //     return errors;
                // }}
                onSubmit={values => {
                    ratesApi.fetchExchangeCalculation(ccyFrom, ccyTo, amount)
                        .then(resp => setExchangeTable(resp.data));
                }}
            >
                {(props) => (
                    <Form>
                        <div className={classes.form}>
                            {/*<Field*/}
                            {/*    label="Amount"*/}
                            {/*    name="amount"*/}
                            {/*    type="text"*/}
                            {/*    component={TextField}*/}
                            {/*    style={{width: 300}}*/}
                            {/*    variant="outlined"*/}
                            {/*    // onChange={(event: any, newValue: string | null) => {*/}
                            {/*    //     setAmount(newValue);*/}
                            {/*    // }}*/}
                            {/*    renderInput={(params) => <TextField {...params} label="Amount" variant="outlined"/>}*/}
                            {/*/>*/}
                            {/*<ErrorMessage className="error" name="amount"/>*/}
                            <Field label="Amount" name="amount" type="text" component={TextField} variant="outlined"
                                   onChange={(event: any, newValue: string | null) => {
                                       setAmount(newValue);
                                   }}/>
                            <Autocomplete
                                style={{width: 300}}
                                className={classes.filterDropdown}
                                options={availableCcy}
                                value={ccyFrom}
                                onChange={(event: any, newValue: string | null) => {
                                    setCcyFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Ccy from" variant="outlined"/>}
                            />
                            {/*<ErrorMessage className="error" name="ccyFrom"/>*/}
                            <Autocomplete
                                style={{width: 300}}
                                className={classes.filterDropdown}
                                options={availableCcy}
                                value={ccyTo}
                                onChange={(event: any, newValue: string | null) => {
                                    setCcyTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Ccy To" variant="outlined"/>}
                            />
                            {/*<ErrorMessage className="error" name="ccyFrom"/>*/}
                        </div>
                        <div className={classes.form}>
                            <Button variant="contained" color="primary" type="submit">Calculate</Button>

                        </div>
                    </Form>

                )
                }
            </Formik>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency From</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Currency From</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Calculated rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{
                        exchangeTable.content.map(calculation => (
                                    <TableRow key={calculation.ccyFrom}>
                                        <TableCell>{calculation.ccyFrom}</TableCell>
                                        <TableCell>{calculation.rateFrom}</TableCell>
                                        <TableCell>{calculation.ccyTo}</TableCell>
                                        <TableCell>{calculation.rateTo}</TableCell>
                                        <TableCell>{calculation.calculatedAmount}</TableCell>
                                    </TableRow>
                                ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}