const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel')
// @desc Register new user
// @route POST /api/employee
// @access public 

const registerUser = asyncHandler(async(req, res) =>
{   
    const {  Username, Password} = req.body;
    
    if(!Username || !Password) {
        res.status(400)
        
        throw new Error('Please enter username and password and empid')
    }

    //check if user exists already
    const userExists = await Employee.findOne({Username})
    if(userExists) {
        res.status(400)
        throw new Error ('username already exists')
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(Password, salt)

    //creat user
    const user = await Employee.create({
        
        Username,
        Password : hashedPassword
    })
    
    if(user)
    {
        res.status(201).json({
            _id: user.id,
           
            Username : user.Username,
            token:generateToken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    } 
}
)


// @desc Authenticate a user/ login as a user
// @route POST /api/employee/login
// @access public 

const loginUser = asyncHandler(async(req, res) =>
{
const {Username, Password} = req.body

const user = await Employee.findOne({Username})

if(user &&  (await bcrypt.compare(Password, user.Password)))
{
    res.json({
        _id: user.id,
        Empid: user.Empid,
        Username : user.Username,
        token:generateToken(user._id)
    })

}else{
    res.status(400)
    throw new Error ('Invalid Credential ')
}

}
)
// @desc get user data view
// @route GET /api/employee/me
// @access private

const getMe = asyncHandler(async(req, res) =>
{
    
    res.status(200).json({
        id:req.user._id,
        Empid:req.user.Empid,
        Username :req.user.Username
    })
}
)

//generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {expiresIn: '30d'})
}
module.exports = {
    registerUser,
    loginUser,
    getMe
}