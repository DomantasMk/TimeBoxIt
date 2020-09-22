import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function TopicEditDialog({ topic, openState, close }) {
  const [state, setState] = useState({
    title: topic.title,
    description: topic.description,
  });
  const [deleteTopic, setDeleteTopic] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    setState({ title: topic.title, description: topic.description });
  }, [topic]);
  useEffect(() => {
    if (deleteTopic) {
      handleClose();
      setDeleteTopic(false);
    }
  }, [deleteTopic]);
  const handleClose = () => {
    let query = "";
    if (!deleteTopic) {
      query = `
        mutation{
            updateTopic(id:"${topic._id}",topicInput:{title:"${state.title}",description:"${state.description}"}){
              _id
            }
          }
        `;
    } else {
      console.log("delete");
      query = `
        mutation{
          deleteTopic(id:"${topic._id}")
        }`;
      console.log(query);
    }
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
        <DialogTitle id="form-dialog-title">Edit your topic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            defaultValue={topic.title}
            onChange={handleChange}
            name="title"
          />
          <TextField
            autoFocus
            label="Description"
            fullWidth
            defaultValue={topic.description}
            onChange={handleChange}
            name="description"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteTopic(true);
            }}
            color="primary"
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
