import React from "react"
import { Router, Redirect } from "@reach/router"
import Calendar from "../components/Calendar";
import Login from '../dynamicPages/login';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/mainTheme';
import SideDrawer from '../components/sideDrawer';
import TopicsList from '../components/TopicsList';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SideDrawer>
                <Router basepath="/app">
                    <Redirect path="/" to="/app/Login"/>
                    <Calendar path="/Calendar" />
                    <Login path="/Login" />
                    <TopicsList path="/Topics"/>
                </Router>
            </SideDrawer>
        </ThemeProvider>
    )
}
export default App