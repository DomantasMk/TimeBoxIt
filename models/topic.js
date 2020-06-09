const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: false,
    },
    Tasks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
})
module.exports = topic = mongoose.model('Topic', topicSchema);