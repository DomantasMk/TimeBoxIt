import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "../styles/mainTheme";
import Modal from "./TaskEditDialog";
import { parse } from "date-fns";
import { apiUrl } from "./utils/ApiUrl";

const useStyles = makeStyles((theme) => ({
  AddButton: {
    display: "flex",
    justifyContent: "center",
  },
  list: {
    marginTop: 10,
  },
}));

export default function TasksList({
  tasksList,
  setTasksList,
  modalState,
  setModalState,
  currentDate,
}) {
  const classes = useStyles(theme);
  const [taskInEdit, setTaskInEdit] = React.useState({});

  const handleToggle = (task) => () => {
    let newState = false;
    if (!task.state) {
      newState = true;
    }
    let query = `
      mutation{
        updateTask(id:"${task._id}",taskInput:{state:${newState}}){
          state
        }
      }`;
    axios({
      url: `${apiUrl}/graphiql`,
      method: "post",
      data: {
        query: query,
      },
    })
      .then((result) => {
        let index = tasksList.indexOf(task);
        let newList = tasksList;
        newList[index].state = newState;
        setTasksList([...newList]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = (task) => () => {
    let query = `
      mutation{
        deleteTask(id:"${task._id}")
      }`;
    axios({
      url: `${apiUrl}/graphiql`,
      method: "post",
      data: {
        query: query,
      },
    })
      .then((result) => {
        let index = tasksList.indexOf(task);
        let newList = tasksList;
        newList.splice(index, 1);
        setTasksList([...newList]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTask = () => {
    let query = `
      mutation{
        createTask(taskInput:{title:"Task ${tasksList.length +
          1}",description:"",from:"00:00",to:"00:00",date:"${parse(
      currentDate,
      "yyyy-MM-dd",
      new Date()
    )}"}){
          _id
          date
          description
          title
          state
          from
          to
        }
      }`;
    axios({
      url: `${apiUrl}/graphiql`,
      method: "post",
      data: {
        query: query,
      },
    })
      .then((result) => {
        setTasksList([...tasksList, result.data.data.createTask]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openEdit = (task) => {
    setTaskInEdit(task);
    setModalState(true);
  };
  const closeEdit = () => {
    setTaskInEdit({});
    setModalState(false);
  };
  return (
    <React.Fragment>
      <List className={classes.list}>
        {tasksList.map((task) => {
          return (
            <ListItem key={task._id}>
              <ListItemIcon onClick={handleToggle(task)}>
                <Checkbox
                  edge="start"
                  checked={task.state}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": task }}
                />
              </ListItemIcon>
              <ListItemText primary={task.title} secondary={task.description} />
              <Fab
                style={{ marginRight: 10 }}
                color="primary"
                aria-label="edit"
                size="small"
                onClick={() => {
                  openEdit(task);
                }}
              >
                <EditIcon style={{ color: "white" }} />
              </Fab>
              <Fab
                color="primary"
                aria-label="edit"
                size="small"
                onClick={deleteTask(task)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </Fab>
            </ListItem>
          );
        })}
      </List>
      <div className={classes.AddButton}>
        <Fab
          style={{ marginBottom: 10 }}
          aria-label="Add"
          color="primary"
          size="small"
          onClick={addTask}
        >
          <AddIcon fontSize={"large"} style={{ color: "white" }} />
        </Fab>
      </div>
      <Modal openState={modalState} close={closeEdit} task={taskInEdit} />
    </React.Fragment>
  );
}
