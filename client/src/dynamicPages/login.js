import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    }
  }));


export default function Login() {
    const classes = useStyles();
    return (
        <Box class={classes.paper}>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off">
                    <Box class={classes.paper}>
                        <Typography variant="h2" gutterBottom>
                            Account Login
                        </Typography>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth/>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth/>
                    </Box>
                    <Box class={classes.paper}>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
                    </Box>
                    <Box class={classes.paper}>
                        <Button variant="contained" fullWidth color="primary" disableElevation>
                            Sign up
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>

    )
}
