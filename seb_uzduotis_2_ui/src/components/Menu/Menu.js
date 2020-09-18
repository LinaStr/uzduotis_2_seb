import React from "react";
import './Menu.css'
import {NavLink} from "react-router-dom";
// import { NavHashLink as NavLink } from 'react-router-hash-link';

export default () => {

    return (
        <div className="menu-container">

            <NavLink
                to="/allRates"
                activeClassName="selected"
            >Žiūrėti visus valiutų kursus</NavLink>
            |
            <NavLink
                to="/exchange"
                activeClassName="selected"
            >Valiutos skaičiuoklė</NavLink>
        </div>
    )
}
