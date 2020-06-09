const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: false,
    },
    date:{
        type:String,
        require:false,
    },
    from:{
        type:String,
        require:false
    },
    to:{
        type:String,
        require:false,
    },
    state:{
        type:Boolean,
        require:false,
    },
    topic:{
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }
})
module.exports = task = mongoose.model('Task', taskSchema);