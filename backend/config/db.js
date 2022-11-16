const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)

        console.log(`Connect to mongo database: ${conn.connection.host}`.red.underline)
    }
    catch (error) {
        console.log(`Error connecting to db`)
        process.exit(1)
    }
}

module.exports = connectDB