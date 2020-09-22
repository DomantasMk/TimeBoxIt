import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import Calendar from "./Calendar";
import Login from "./login";
import Register from "./Register";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/mainTheme";
import SideDrawer from "../components/sideDrawer";
import TopicsList from "./TopicsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./MainAppView";
import authContext from "../context/auth-context";
import auth from "../components/utils/auth";
import { navigate } from "@reach/router";
import Profile from "./Profile";

const App = () => {
  const [state, setState] = useState({
    token: localStorage.getItem("token"),
    userID: localStorage.getItem("userID"),
    isAuth: false,
  });
  const login = (token, userID) => {
    setState({ token: token, userID: userID });
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);
    auth().then((result) => {
      setState({ isAuth: result });
      navigate("/main");
    });
  };
  const logout = () => {
    setState({ token: null, userID: null, isAuth: false });
    localStorage.clear();
  };
  useEffect(() => {
    auth().then((result) => setState({ isAuth: result }));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <authContext.Provider
        value={{
          token: state.token,
          userID: state.userID,
          login: login,
          logout: logout,
        }}
      >
        <Router basepath="/">
          {!state.isAuth && <Login path="/login" />}
          {!state.isAuth && <Register path="/register" />}
          {!state.isAuth && <Redirect path="/" from="/" to="/login" default />}
          {state.isAuth && <Redirect path="/" from="/" to="/main" default />}
          {state.isAuth && (
            <SideDrawer path="/">
              <Calendar path="/calendar" />
              <TopicsList path="/topics" />
              <Main path="/main" />
              <Profile path="/profile" />
            </SideDrawer>
          )}
        </Router>
      </authContext.Provider>
    </ThemeProvider>
  );
};
export default App;
