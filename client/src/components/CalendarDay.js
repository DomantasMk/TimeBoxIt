import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { makeStyles } from "@material-ui/core/styles";
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import makeTasks from "./utils/makeTasks";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  Calendar: {
    marginLeft: theme.spacing("auto"),
    marginRight: theme.spacing("auto"),
    flexGrow: 1,
    marginTop: 1,
    elevation: 10,
    height: 100,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default function CalendarDay({
  currentDate,
  tasksList,
  setCurrentDate,
}) {
  const [data, setData] = React.useState(makeTasks(tasksList));
  useEffect(() => {
    setData(makeTasks(tasksList));
  }, [tasksList, currentDate]);

  const classes = useStyles();

  return (
    <div className={classes.Calendar}>
      <Paper style={{ height: "97vh" }}>
        <Scheduler data={data} height={"auto"}>
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName="Day"
            onCurrentDateChange={(date) => {
              setCurrentDate(format(date, "yyyy-MM-dd"));
            }}
          />
          <DayView startDayHour={6} endDayHour={24} />
          <Toolbar />
          <DateNavigator />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}
