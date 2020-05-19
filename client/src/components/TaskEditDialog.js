import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TaskEditDialog({task, openState, close}) {
    const [state, setState] = useState({ title: "", description: "", from:"",to:"",date:"" });
    const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
  const handleClose = () => {
    console.log(state);
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
          <TextField autoFocus label="Title" fullWidth defaultValue={"aa"} onChange={handleChange} name="title"/>
          <TextField autoFocus label="Description" fullWidth defaultValue={"aa"} onChange={handleChange} name="description"/>
          <TextField autoFocus label="From" id="time" type="time" fullWidth defaultValue={"00:00"} onChange={handleChange} name="from"/>
          <TextField autoFocus label="To" id="time" type="time" fullWidth defaultValue={"00:00"} onChange={handleChange} name="to"/>
          <TextField autoFocus label="Date" id="date" type="date" fullWidth defaultValue={"2017-05-24"} onChange={handleChange} name="date"/>
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