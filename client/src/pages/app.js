import React from "react"
import { Router, Redirect } from "@reach/router"
import Calendar from "../dynamicPages/Calendar";
import Login from '../dynamicPages/login';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/mainTheme';
import SideDrawer from '../components/sideDrawer';
import TopicsList from '../dynamicPages/TopicsList';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from '../dynamicPages/MainAppView';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SideDrawer>
                <Router basepath="/app">
                    <Redirect path="/" to="/app/Main"/>
                    <Calendar path="/Calendar" />
                    <Login path="/Login" />
                    <TopicsList path="/Topics"/>
                    <Main path="/Main"/>
                </Router>
            </SideDrawer>
        </ThemeProvider>
    )
}
export default App