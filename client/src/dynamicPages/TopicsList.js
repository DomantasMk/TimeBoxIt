import React, { Component } from 'react'
import TopicContainer from '../components/TopicContainer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles} from '@material-ui/core/styles';

let topicsList = [{
    TopicName:"workingOut",
    dailyTasks:2,
    tasksDone:10,
    tasksFailed:5,
    type:"daily/weekly/biweekly/monthly"
},
{
    TopicName:"workingOut",
    dailyTasks:2,
    tasksDone:10,
    tasksFailed:5,
    type:"daily/weekly/biweekly/monthly"
}]
const useStyles = makeStyles((theme) => ({
    AddButton: {
        display:"flex",
        justifyContent:'center',
    },
  }));

export default function TopicsList() {
    const classes = useStyles();
    return (
        <React.Fragment>
            {topicsList.map( topic =>{
                return <TopicContainer topic={topic}/>
            })
            }
            <div class={classes.AddButton}>
                <IconButton aria-label="Add" >
                    <AddCircleIcon fontSize={"large"} color={"primary"} />
                </IconButton>
            </div>


        </React.Fragment>
    )
}
