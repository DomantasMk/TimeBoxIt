import React from 'react'

export default function makeTasks(Tasks) {
    return Tasks.map(task =>{
        let startDate = new Date(task.date);
        let endDate = new Date(task.date);
        startDate.setHours(task.from.split(":")[0],task.from.split(":")[1]); //because from format is "hours:minutes like 01:20"
        endDate.setHours(task.to.split(":")[0],task.to.split(":")[1]);

        
        return {
            startDate:startDate,
            endDate:endDate,
            title:task.title,
            id:task._id,
            location:"",
        }
    })
}
