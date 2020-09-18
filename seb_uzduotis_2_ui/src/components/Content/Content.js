import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RatesListPage from "../../pages/RatesListPage/RatesListPage";
import ExchangePage from "../../pages/ExchangePage/ExchangePage";


export default () => (
    <Switch>
        <Redirect exact from="/" to="/allRates" />

        <Route exact path="/allRates">
            <RatesListPage/>
        </Route>

        <Route exact path="/exchange">
            <ExchangePage/>
        </Route>

        <Route>
            <h1>Puslapis nerastas!</h1>
        </Route>
    </Switch>
)
