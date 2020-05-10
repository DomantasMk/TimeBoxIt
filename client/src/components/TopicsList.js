import React, { Component } from 'react'
import TopicContainer from './TopicContainer';

let topicsList = [{
    TopicName:"workingOut",
    dailyTasks:2,
    tasksDone:10,
    type:"daily/weekly/biweekly/monthly"
},
{
    TopicName:"workingOut",
    dailyTasks:2,
    tasksDone:10,
    type:"daily/weekly/biweekly/monthly"
}]


export default class TopicsList extends Component {
    render() {
        return (
            <div>
                {topicsList.map( topic =>{
                    return <TopicContainer topic={topic}/>
                })
                }
            </div>
        )
    }
}
