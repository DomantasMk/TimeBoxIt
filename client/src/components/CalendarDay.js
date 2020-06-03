import React,{useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import makeTasks from './utils/makeTasks';

const useStyles = makeStyles((theme) => ({
  Calendar: {
    marginLeft:theme.spacing("auto"),
    marginRight:theme.spacing("auto"),
    flexGrow: 1,
    marginTop:1,
    elevation:10,
    height:100,
    [theme.breakpoints.down('xs')]: {
        display:'none',
      }
  },
}));

export default function CalendarDay({currentDate, tasksList}){
  const [data, setData] = React.useState(makeTasks(tasksList));
  useEffect(() => {
    setData(makeTasks(tasksList));
  },[tasksList]);

  const classes = useStyles();

    return (

      <div className={classes.Calendar}>
        <Paper style={{height:'97vh'}}>
          <Scheduler
            data={data}
            height={'auto'}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Day"
            />
            <DayView
              startDayHour={6}
              endDayHour={24}
            />
            <Toolbar />
            <DateNavigator/>
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    );
}