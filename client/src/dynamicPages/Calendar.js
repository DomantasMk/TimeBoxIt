import React,{useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import makeTasks from '../components/utils/makeTasks';

import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  Calendar: {
    marginLeft:theme.spacing("auto"),
    marginRight:theme.spacing("auto"),
    flexGrow: 1,
    marginTop:1,
    elevation:10,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      //marginLeft: 180,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop:theme.spacing(5),
    }
  },
}));

export default function Calendar(){
  const [data, setData] = React.useState([]);
  const [currentDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));

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
      setData(makeTasks(result.data.data.tasks));
    }).catch((err) =>{console.log(err)});
  },[currentDate]);

  const classes = useStyles();

    return (
      <div className={classes.Calendar}>

        <Paper>
          <Scheduler
            data={data}
            height={760}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Month"
            />
            <MonthView />
            <WeekView
              startDayHour={10}
              endDayHour={19}
            />
            <DayView
              startDayHour={6}
              endDayHour={24}
            />
            <Toolbar />
            <DateNavigator/>
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip/>
          </Scheduler>
        </Paper>
      </div>
    );
}