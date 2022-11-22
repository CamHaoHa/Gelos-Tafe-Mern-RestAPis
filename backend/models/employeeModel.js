const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema({
    "Empid": {
        type: Number,
        unique: true,
        
    },

    "Username": {
        type: String,
        required: [true, `please add a user name`],
        unique: true, 
        lowercase: true,
        trim: true
    } ,

    "Password": {
        type: String,
        required: [true, `please add a password`],
        minlength:6
    },
    "roles": {
        type: Number,
        default: 0
    }

    
},
{
    timestamps: true
})

module.exports = mongoose.model('Employee', employeeSchema)