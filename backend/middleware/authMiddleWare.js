const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const employee = require('../models/employeeModel')

const protect = asyncHandler(async(req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the toke
            req.user = await employee.findById(decoded.id).select('-password')

            next()
    } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorised')
    }
}

if(!token) {
    res.status(401)
    throw new Error('Not authorised, notoken')
}
})

module.exports ={protect}