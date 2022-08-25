const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    date:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: String
    },
    status:{
       type: Number, default: 1
    }
})

module.exports = mongoose.model('Data', dataSchema)