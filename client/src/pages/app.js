import React from "react"
import { Router, Redirect } from "@reach/router"
import Layout from "../components/Layout"
import Calendar from "../components/Calendar";
import Login from '../dynamicPages/login';

const App = () => {
    return (
        <Router basepath="/app">
            <Redirect path="/" to="/app/Login"/>
            <Calendar path="/Calendar" />
            <Login path="/Login" />
        </Router>
    )
}
export default App