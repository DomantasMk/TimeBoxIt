import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {navigate} from "@reach/router";
import axios from "axios";

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

export default function Profile() {
    
    const classes = useStyles();
    const [state, setState] = useState({ Username: "", Password: "", Email:"" });
    const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
    };
    const handleSubmit = () =>{

    }
    return (
        <Box class={classes.paper}>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off">
                    <Box class={classes.paper}>
                        <Typography variant="h2" gutterBottom>
                            Account
                        </Typography>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth onChange={handleChange} name="Email"/>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth onChange={handleChange} name="Username"/>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" type="password" label="Password" variant="outlined" fullWidth onChange={handleChange} name="Password"/>
                    </Box>
                    <Box class={classes.paper}>
                        <Button variant="contained" fullWidth color="primary" disableElevation onClick={handleSubmit}>
                            Edit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}
