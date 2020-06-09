const Topic = require('../../models/topic');
const User = require('../../models/user');
const mongoose = require('mongoose');

module.exports = {
    topics: (args,req) =>{
        if(!req.isAuth){
            throw new Error("Not authorized");
        }
        return User.findById(req.userId).then(user =>{
             if (!user) {
                 throw new Error ("Your User doesnt exist");
             }
             return Topic.find().where('_id').in(user.addedTopics);
        })
    },
    createTopic: (args, req) =>{
        if(!req.isAuth){
            throw new Error("Not authorized");
        }
        let newTopic;
        const topic = new Topic({
            title: args.topicInput.title,
            description : args.topicInput.description,
        });
        //return so it will be excetuted in async
        return topic
        .save()
        .then((result) => {
            newTopic = {...result._doc};
            return User.findById(req.userId)
        })
        .then(user =>{
           if (!user) {
                throw new Error ("Your User doesnt exist");
            }
            user.addedTopics.push(topic);
            return user.save();

        })
        .then(()=>{
            return newTopic;
        })
        .catch((err) =>{console.log(err); throw err;});
    },
    updateTopic : (args, req) =>{
        //if(!req.isAuth){
        //    throw new Error("Not authorized");
        //}
        return Topic.findOneAndUpdate({_id: args.id}, args.topicInput, {new:true}).then(a => a);
    },
    deleteTopic :(args, req) =>{
        //if(!req.isAuth){
        //    throw new Error("Not authorized");
        //}
        //reikia pridet susiejima su user kaip create taske
        Topic.findByIdAndDelete(args.id).then(() =>{return true;});

    }
}