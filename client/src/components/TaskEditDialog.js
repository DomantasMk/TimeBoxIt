import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format } from 'date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";

export default function TaskEditDialog({task, openState, close}) {
    const [state, setState] = useState({ title: task.title, description: task.description, from:task.from,to:task.to,date:new Date() });
    const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
  const handleClose = () => {
    console.log(task.title);
    console.log(state.title);
    let query = `
    mutation{
      updateTask(id:"${task._id}", taskInput:{title:"${state.title}",description:"${state.description}",from:"${state.from}",to:"${state.to}",date:"${state.date}"}){
        _id
      }
    }`;
    console.log(query);
    axios({
      url: 'http://localhost:5000/graphiql',
      method: 'post',
      data: {
          query: query
        }
    }).catch((err) =>{console.log(err)});


    close();
  };
  return (
    <div>
      <Dialog open={openState} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit your task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your task
          </DialogContentText>
          <TextField autoFocus label="Title" fullWidth defaultValue={task.title} onChange={handleChange} name="title"/>
          <TextField autoFocus label="Description" fullWidth defaultValue={task.description} onChange={handleChange} name="description"/>
          <TextField autoFocus label="From" id="time" type="time" fullWidth defaultValue={task.from ? task.from : "00:00"} onChange={handleChange} name="from"/>
          <TextField autoFocus label="To" id="time" type="time" fullWidth defaultValue={task.to ? task.to : "00:00"} onChange={handleChange} name="to"/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder="2420/06/10"
              value={state.date}
              onChange={date => setState({date:date})}
              format="yyyy/MM/dd"
              fullWidth
              style={{marginTop:"1em"}}
            />
          </MuiPickersUtilsProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}