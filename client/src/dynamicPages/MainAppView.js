import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalendarDay from '../components/CalendarDay';
import TaskList from '../components/TasksList';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  List: {
      paddingLeft:theme.spacing(1),
      
  },

}));

export default function MainAppView() {
    const classes = useStyles();
    return (
        <Box class={classes.List}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={7} lg={8}>
                    <Paper><TaskList/></Paper>
                </Grid>
                <Grid item xs={0} sm={6} md={5} lg={4}>
                    <Paper><CalendarDay/></Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
