import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { navigate } from "@reach/router";
import axios from "axios";
import { apiUrl } from "../components/utils/ApiUrl";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "25rem",
    margin: "2rem",
  },
  paper: {
    margin: `auto`,
    display: `flex`,
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  register: {
    color: "gray",
    cursor: "pointer",
  },
}));

export default function Register() {
  const classes = useStyles();
  const [state, setState] = useState({ Username: "", Password: "", Email: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    let query = `
        mutation{
            createUser(userInput:{username:"${state.Username}", email:"${state.Email}",password:"${state.Password}"}){
              _id
            }
          }`;
    axios({
      url: `${apiUrl}/graphiql`,
      method: "post",
      data: {
        query: query,
      },
    })
      .then((result) => {
        if (result) {
          navigate("Login");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert("User not found");
      });
  };
  return (
    <Box class={classes.paper}>
      <Paper>
        <form className={classes.root} noValidate autoComplete="off">
          <Box class={classes.paper}>
            <Typography variant="h2" gutterBottom>
              Registration
            </Typography>
          </Box>
          <Box class={classes.paper}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="Email"
            />
          </Box>
          <Box class={classes.paper}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="Username"
            />
          </Box>
          <Box class={classes.paper}>
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="Password"
            />
          </Box>
          <Box class={classes.paper}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disableElevation
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </Box>
        </form>
        <Divider />
        <Box className={classes.paper}>
          <Typography
            variant="h5"
            class={classes.register}
            gutterBottom
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Login here!
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
