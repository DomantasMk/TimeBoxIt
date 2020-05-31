import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalendarDay from '../components/CalendarDay';
import TaskList from '../components/TasksList';
import Box from '@material-ui/core/Box';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  List: {
      paddingLeft:theme.spacing(1),
      
  },

}));

export default function MainAppView() {
    const [tasksList, setTasksList] = React.useState([]);
    const [modalState, setModalState] = React.useState(false);
    
    useEffect(() => {
        axios({
          url: 'http://localhost:5000/graphiql',
          method: 'post',
          data: {
              query: `
                query {tasks{
                  _id
                  date
                  description
                  title
                  state
                  from
                  to
                }}
                `
            }
        }).then((result) => {
          setTasksList(result.data.data.tasks);

        }).catch((err) =>{console.log(err)});
      },[modalState]);

    const classes = useStyles();
    return (
        <Box class={classes.List}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={7} lg={8}>
                    <Paper><TaskList tasksList={tasksList} setTasksList={setTasksList} modalState={modalState} setModalState={setModalState}/></Paper>
                </Grid>
                <Grid item xs={0} sm={6} md={5} lg={4}>
                    <Paper><CalendarDay/></Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
