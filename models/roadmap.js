const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a model

const roadmapSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = roadmap = mongoose.model('roadmap', roadmapSchema);