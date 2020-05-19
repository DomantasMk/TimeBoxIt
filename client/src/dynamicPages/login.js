import React, {useState, useContext} from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { navigate } from "@reach/router"
import authContext from '../context/auth-context';
import axios from 'axios';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'25rem',
        margin:'2rem',
    },
    paper: {
        margin: `auto`,
        display:`flex`,
        justifyContent:'center',
        padding:theme.spacing(1),
    },
    register:{
        color:"gray",
        cursor:"pointer",
    }
  }));


function Login() {
    const auth = useContext(authContext);
    const classes = useStyles();
    const [state, setState] = useState({ Email: "", Password: "" });
    const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
    const handleSubmit = () =>{
        let query = `
        query{
            login(email:"${state.Email}",password:"${state.Password}"){
              token
              userId
            }
          }`;
        axios({
          url: 'http://localhost:5000/graphiql',
          method: 'post',
          data: {
              query: query
            }
        }).then((result) => {
            const {token, userId} = result.data.data.login;
            auth.login(token,userId);
        }).catch((err) =>{alert("User not found");});
    }
    return (
        <Box className={classes.paper}>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off">
                    <Box className={classes.paper}>
                        <Typography variant="h2" gutterBottom>
                            Account Login
                        </Typography>
                    </Box>
                    <Box className={classes.paper}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth onChange={handleChange} name="Email"/>
                    </Box>
                    <Box className={classes.paper}>
                        <TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth onChange={handleChange} name="Password"/>
                    </Box>
                    <Box className={classes.paper}>
                        <Button variant="contained" fullWidth color="primary" onClick={handleSubmit} disableElevation>
                            Login
                        </Button>
                    </Box>

                </form>
                <Divider/>
                <Box className={classes.paper}>
                    <Typography variant="h5" class={classes.register} gutterBottom onClick={()=>{navigate("/app/Register")}}>
                        Don't have an account? Register here!
                    </Typography>
                 </Box>

            </Paper>
            
        </Box>

    )
}
export default Login;