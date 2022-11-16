const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products' , require('./routes/productRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log('listening on port ' + port))