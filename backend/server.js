const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const cors = require('cors')



const port = process.env.PORT

connectDB()

const app = express()
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products' , require('./routes/productRoutes'))
app.use('/api/employee', require('./routes/employeeRoutes'))
app.use('/api/order', require('./routes/orderRoutes'))

app.use(errorHandler)


app.listen(port, () => console.log('listening on port ' + port))