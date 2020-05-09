const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    addedTasks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]

});
module.exports = user = mongoose.model("User", userSchema);