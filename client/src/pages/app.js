import React from "react"
import { Router, Redirect } from "@reach/router"
import Calendar from "../components/Calendar";
import Login from '../dynamicPages/login';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/mainTheme';
import SideDrawer from '../components/sideDrawer';
import TopicsList from '../components/TopicsList';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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