import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles((theme) => ({
    paper: {
        display:`flex`,
        justifyContent:'center',
        padding:theme.spacing(1),
    },
    div:{
        minWidth:"100%",
        padding:theme.spacing(2),
    }

  }));

export default function UserInfo({email,username}) {
    
    const classes = useStyles();

    return (
        <Box className={classes.paper}>
            <Paper className={classes.div}>
                <Box>
                    <Typography variant={"h4"}>Username: {username}</Typography>
                </Box>
                <Box>
                    <Typography variant={"h5"}>Email: {email}</Typography>
                </Box>
            </Paper>
        </Box>
    )
}
