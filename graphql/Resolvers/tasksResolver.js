const Task = require('../../models/task');
const User = require('../../models/user');
const mongoose = require('mongoose');

module.exports = {
    tasks: (args,req) =>{
        if(!req.isAuth){
            throw new Error("Not authorized");
        }
        return User.findById(req.userId).then(user =>{
             if (!user) {
                 throw new Error ("Your User doesnt exist");
             }
             return Task.find().where('_id').in(user.addedTasks).populate("topic");
        })
    },
    createTask: (args, req) =>{
        if(!req.isAuth){
            throw new Error("Not authorized");
        }
        let newTask;
        const task = new Task({
            title: args.taskInput.title,
            description : args.taskInput.description,
            from: args.taskInput.from,
            to: args.taskInput.to,
            date: args.taskInput.date,
            state: args.taskInput.state,
            topic: args.taskInput.topic,
        });
        //return so it will be excetuted in async
        return task
        .save()
        .then((result) => {
            newTask = {...result._doc};
            return User.findById(req.userId)
        })
        .then(user =>{
           if (!user) {
                throw new Error ("Your User doesnt exist");
            }
            user.addedTasks.push(task);
            return user.save();

        })
        .then(()=>{
            return newTask;
        })
        .catch((err) =>{console.log(err); throw err;});
    },
    updateTask : (args, req) =>{
        //if(!req.isAuth){
        //    throw new Error("Not authorized");
        //}
        return Task.findOneAndUpdate({_id: args.id}, args.taskInput, {new:true}).then(a => a);
    },
    deleteTask :(args, req) =>{
        //if(!req.isAuth){
        //    throw new Error("Not authorized");
        //}
        //reikia pridet susiejima su user kaip create taske
        Task.findByIdAndDelete(args.id).then(() =>{return true;});

    }
}