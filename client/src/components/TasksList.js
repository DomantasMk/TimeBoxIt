import React, { Component, useEffect } from 'react'
import TaskContainer from './TaskContainer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import axios from "axios";

/*let tasksList = [{
    id:1,
    title:"TaskTitle",
    description:"descriptionero",
    date:"DATE",
},
{
    id:2,
    title:"TaskTitle2",
    description:"descriptionero2",
    date:"DATE2",
}]
*/
const useStyles = makeStyles((theme) => ({
    AddButton: {
        display:"flex",
        justifyContent:'center',
    },
    list:{
    }
  }));

export default function TasksList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [tasksList, setTasksList] = React.useState([]);

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
                  }}
                  `
              }
          }).then((result) => {
            setTasksList(result.data.data.tasks);
          }).catch((err) =>{console.log(err)});
        });
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    
    return (
        
        <React.Fragment>
            <List class={classes.list}>
            {tasksList.map( task =>{
                 const labelId = `checkbox-list-label-${task}`;
                 return <ListItem onClick={handleToggle(task)} key={task._id} >
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(task) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': task }}
                            />
                            </ListItemIcon>
                            <ListItemText
                            primary={task.title}
                            secondary={task.date}
                            />
                        </ListItem>
            })
            }
            </List>
            <div class={classes.AddButton}>
                <IconButton aria-label="Add" >
                    <AddCircleIcon fontSize={"large"} color={"primary"} />
                </IconButton>
            </div>


        </React.Fragment>
    )
}
