import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalendarDay from '../components/CalendarDay';
import TaskList from '../components/TasksList';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios';
import { format, parse, add } from 'date-fns'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
const useStyles = makeStyles((theme) => ({
  List: {
      paddingLeft:theme.spacing(1),
      
  },

}));

export default function MainAppView() {
    const [tasksList, setTasksList] = React.useState([]);
    const [modalState, setModalState] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));

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
          setTasksList(result.data.data.tasks.filter(task => {
            let date = new Date(task.date);
            let dateNeeded = parse(currentDate, "yyyy-MM-dd", new Date());
            return date.getDate() == dateNeeded.getDate() && date.getMonth() == date.getMonth()
          }));

        }).catch((err) =>{console.log(err)});
      },[modalState, currentDate]);
    let addToDate = (amount) =>{
      let a = parse(currentDate, "yyyy-MM-dd",new Date());
      var result = add(a, {
        days: amount
      });
      setCurrentDate(format(result, "yyyy-MM-dd"));
    }
    const classes = useStyles();
    return (
        <Box class={classes.List}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={7} lg={8}>
                  
                    <Paper>
                    <IconButton aria-label="delete" color="primary" onClick={() =>{addToDate(-1)}}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="primary" onClick={() =>{addToDate(1)}}>
                      <NavigateNextIcon />
                    </IconButton>
                    {currentDate}
                    </Paper>
                    <Paper><TaskList tasksList={tasksList} setTasksList={setTasksList} modalState={modalState} setModalState={setModalState}/></Paper>
                </Grid>
                <Grid item xs={0} sm={6} md={5} lg={4}>
                    <Paper><CalendarDay currentDate={currentDate} tasksList={tasksList} setCurrentDate={setCurrentDate}/></Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
