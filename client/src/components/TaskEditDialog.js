import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function TaskEditDialog({ task, openState, close }) {
  const [state, setState] = useState({
    title: task.title,
    description: task.description,
    topic: task.topic ? task.topic._id : "",
    from: task.from,
    to: task.to,
    date: task.date,
  });
  const [topics, setTopics] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    setState({
      title: task.title,
      description: task.description,
      topic: task.topic,
      from: task.from,
      to: task.to,
      date: task.date,
    });
  }, [task]);
  useEffect(() => {
    axios({
      url: "http://localhost:5000/graphiql",
      method: "post",
      data: {
        query: `
            query{
              topics{
                _id
                title
              }
            }
              `,
      },
    }).then((result) => {
      setTopics(result.data.data.topics);
    });
  }, []);

  const handleClose = () => {
    let query = `
    mutation{
      updateTask(id:"${task._id}", taskInput:{title:"${
      state.title
    }",description:"${state.description}",${
      task.topic ? `topic:"${task.topic._id}",` : ""
    }from:"${state.from}",to:"${state.to}",date:"${state.date}"}){
        _id
      }
    }`;
    axios({
      url: "http://localhost:5000/graphiql",
      method: "post",
      data: {
        query: query,
      },
    }).catch((err) => {
      console.log(err);
    });

    close();
  };
  return (
    <div>
      <Dialog
        open={openState}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit your task</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your task</DialogContentText>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            defaultValue={task.title}
            onChange={handleChange}
            name="title"
          />
          <TextField
            autoFocus
            label="Description"
            fullWidth
            defaultValue={task.description}
            onChange={handleChange}
            name="description"
          />
          <InputLabel shrink id="TopicId">
            Topic
          </InputLabel>
          <Select
            labelId="TopicId"
            onChange={handleChange}
            defaultValue={task.topic ? task.topic._id : " "}
            displayEmpty
            fullWidth
            name="topic"
          >
            <MenuItem value=" ">
              <em>None</em>
            </MenuItem>
            {topics.map((topic) => {
              return (
                <MenuItem value={topic._id} key={topic._id}>
                  {topic.title}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            autoFocus
            label="From"
            id="time"
            type="time"
            fullWidth
            defaultValue={task.from ? task.from : "00:00"}
            onChange={handleChange}
            name="from"
          />
          <TextField
            autoFocus
            label="To"
            id="time"
            type="time"
            fullWidth
            defaultValue={task.to ? task.to : "00:00"}
            onChange={handleChange}
            name="to"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              placeholder="2010/06/10"
              value={state.date}
              onChange={(date) =>
                setState((prevState) => ({
                  ...prevState,
                  date: date,
                }))
              }
              format="yyyy/MM/dd"
              fullWidth
              style={{ marginTop: "1em" }}
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
