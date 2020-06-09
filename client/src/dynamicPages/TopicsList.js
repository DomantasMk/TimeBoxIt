import React, { Component, useEffect, useState } from 'react'
import TopicContainer from '../components/TopicContainer';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    AddButton: {
        display:"flex",
        justifyContent:'center',
    },
  }));

export default function TopicsList() {
    const [topicsList, setTopicsList] = React.useState([]);

    useEffect(() => {
        axios({
          url: 'http://localhost:5000/graphiql',
          method: 'post',
          data: {
              query: `
              query{
                topics{
                  title
                  description
                }
              }
                `
            }
        }).then((result) => {
            console.log(result);
          setTopicsList(result.data.data.topics);

        }).catch((err) =>{console.log(err)});
      },[]);
      const addTask = () =>{
        let query = `
        mutation{
            createTopic(topicInput:{title:"Topic ${topicsList.length + 1}",description:"Unknown"}){
              title
              description
            }
          }
          `;
        axios({
          url: 'http://localhost:5000/graphiql',
          method: 'post',
          data: {
              query: query
            }
        }).then((result) => {
            setTopicsList([...topicsList, result.data.data.createTopic]);
        }).catch((err) =>{console.log(err)});
      }
    const classes = useStyles();
    return (
        <React.Fragment>
            {topicsList.map( topic =>{
                return <TopicContainer topic={topic}/>
            })
            }

            <div class={classes.AddButton}>
            <Fab style={{margin:10}} aria-label="Add" color="primary" size="small" onClick={addTask}>
                    <AddIcon fontSize={"large"} style={{color:"white"}} />
                </Fab>
            </div>


        </React.Fragment>
    )
}
