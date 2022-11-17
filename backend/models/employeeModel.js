const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema({
    "Empid": {
        required: true,
        type: Number,
        unique: true
    },

    "Username": {
        type: String,
        required: [true, `please add a user name`],
        unique: true
    } ,

    "Password": {
        type: String,
        required: [true, `please add a password`],
    }
    
},
{
    timestamps: true
})

module.exports = mongule.module('Employee', employeeSchema)