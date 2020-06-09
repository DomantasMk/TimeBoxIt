import React, {useState, useContext, useEffect} from "react"
import { Router, Redirect } from "@reach/router"
import Calendar from "../dynamicPages/Calendar";
import Login from '../dynamicPages/login';
import Register from '../dynamicPages/Register';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/mainTheme';
import SideDrawer from '../components/sideDrawer';
import TopicsList from '../dynamicPages/TopicsList';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from '../dynamicPages/MainAppView';
import authContext from "../context/auth-context";
import auth from "../components/utils/auth";
import {navigate} from '@reach/router';
import Profile from '../dynamicPages/Profile';

const App = () => {
    const [state, setState] = useState({token:localStorage.getItem('token'),userID:localStorage.getItem('userID'), isAuth:false})
    const login = (token, userID) =>{
        setState({token:token,userID:userID});
        localStorage.setItem('token',token);
        localStorage.setItem('userID', userID);
        auth().then(result => {setState({isAuth:result});navigate("/app/Main");});

    }
    const logout = () =>{
        setState({token:null,userID:null, isAuth:false});
        localStorage.clear();
    }
    useEffect(()=>{
        auth().then(result => setState({isAuth:result}));
    },[]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <authContext.Provider value={{token:state.token,userID:state.userID,login:login,logout:logout}}>
                <Router basepath="/app">
                        {!state.isAuth && <Login path="/Login" />}
                        {!state.isAuth && <Register path="/Register" />}
                        {/*!state.isAuth && <Redirect path="/" to="/app/Login" default/>*/}
                        {state.isAuth && <Redirect path="/" to="/app/Main" default/>}
                        {state.isAuth &&
                        <SideDrawer path="/">
                            <Calendar path="/Calendar" />
                            <TopicsList path="/Topics"/>
                            <Main path="/Main"/>
                            <Profile path="/Profile"/>
                        </SideDrawer>}
                </Router>
            </authContext.Provider>


        </ThemeProvider>
    )
}
export default App