import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns'


export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate:format(new Date(), 'yyyy-MM-dd'),
    };

  }

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>

        <Paper>
          <Scheduler
            data={data}
            height={760}
          >
            <ViewState
              defaultCurrentDate={this.state.currentDate}
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
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
