import React, {useEffect, useState} from "react"
import {Field, Form, Formik, ErrorMessage, FieldArray} from "formik";
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
        padding: theme.spacing(0, 2),
        margin: 25,
        width: 300,
        height: 50,
    },
    form: {
        // display: "flex",
        alignItem: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
}));

const formValidationSchema = Yup.object().shape({
    amount: Yup.number()
        .typeError('Must be a number')
        .min(0.01, 'Amount must be bigger than 0.01')
        .required('Amount is required'),
    // ccyFrom: Yup.string()
    //     .required('Required'),
    // ccyTo: Yup.string()
    //     .required('Required')
})


export default () => {
    const classes = useStyles();

    const [initialState] = useState({
        ccyFrom: '',
        ccyTo: '',
        amount: '',
    });
    const [availableCcy, setAvailableCcy] = useState({content: [],});


    const [ccyFrom, setCcyFrom] = React.useState(null);
    const [ccyTo, setCcyTo] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [exchangeTable, setExchangeTable] = useState({});


    useEffect(() => {
        ratesApi.fetchCurrencyNames()
            .then(response => setAvailableCcy(response.data))
    }, [])

    return (
        <Container maxWidth="lg">
            <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={formValidationSchema}
                onSubmit={values => {
                    ratesApi.fetchExchangeCalculation(ccyFrom, ccyTo, values.amount)
                        .then(resp => setExchangeTable(resp.data));
                }}
            >
                {({ errors}) => (
                    <Form>
                        <div className={classes.form}>
                            <h3> Amount:
                            <Field
                                className={classes.filterDropdown}
                                max_length={2}
                                label="Amount"
                                name="amount"
                                type="text"
                                variant="outlined"
                            />
                            <ErrorMessage className="error" name="amount" component="div" />
                            </h3>
                            <Autocomplete
                                className={classes.filterDropdown}
                                options={availableCcy}
                                value={ccyFrom}
                                onChange={(event: any, newValue: string | null) => {
                                    setCcyFrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Ccy from" variant="outlined"/>}
                            />
                            {/*<ErrorMessage className="error" name="ccyFrom" component="div"/>*/}
                            <Autocomplete
                                className={classes.filterDropdown}
                                options={availableCcy}
                                value={ccyTo}
                                onChange={(event: any, newValue: string | null) => {
                                    setCcyTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Ccy To" variant="outlined"/>}
                            />
                            {/*<ErrorMessage className="error" name="ccyTo" component="div"/>*/}
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
                            <TableCell>Rate from (to EUR)</TableCell>
                            <TableCell>Currency To</TableCell>
                            <TableCell>Rate to (to EUR)</TableCell>
                            <TableCell>Calculated amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{
                        <TableRow key={exchangeTable.ccyFrom}>
                            <TableCell>{exchangeTable.ccyFrom}</TableCell>
                            <TableCell>{exchangeTable.rateFrom}</TableCell>
                            <TableCell>{exchangeTable.ccyTo}</TableCell>
                            <TableCell>{exchangeTable.rateTo}</TableCell>
                            <TableCell>{exchangeTable.calculatedAmount}</TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}