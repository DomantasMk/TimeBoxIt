const Task = require('../../models/task');
const User = require('../../models/user')
module.exports = {
    tasks: () =>{
        return Task.find();
    },
    createTask: (args, req) =>{
        if(!req.isAuth){
            throw new Error("Not authorized");
        }
        let newTask;
        const task = new Task({
            title: args.taskInput.title,
            description : args.taskInput.description,
            date: args.taskInput.date,
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
}