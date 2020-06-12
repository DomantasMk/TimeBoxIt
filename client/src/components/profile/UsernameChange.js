import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'30rem',
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

export default function UsernameChangeForm() {
    
    const classes = useStyles();
    const [state, setState] = useState({ NewUsername: "", NewUsernameRepeat: "" });
    const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
    };
    const handleSubmit = () =>{
        if(state.NewUsername == state.NewUsernameRepeat){
            let query = `
            mutation{
                updateUser(username:"${state.NewUsername}"){
                  username
                }
              }`;
            axios({
              url: 'http://localhost:5000/graphiql',
              method: 'post',
              data: {
                  query: query
                }
            }).catch((err) =>{console.log(err)});
        }
        else{
            //validation logic
        }
    }
    return (
        <Box className={classes.paper}>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off">
                    <Box className={classes.paper}>
                        <Typography variant="h3" gutterBottom>
                            Username Change
                        </Typography>
                    </Box>
                    <Box className={classes.paper}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth onChange={handleChange} name="NewUsername"/>
                    </Box>
                    <Box className={classes.paper}>
                        <TextField id="outlined-basic" label="Repeat Username" variant="outlined" fullWidth onChange={handleChange} name="NewUsernameRepeat"/>
                    </Box>
                    <Box className={classes.paper}>
                        <Button variant="contained" fullWidth color="primary" disableElevation onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}
