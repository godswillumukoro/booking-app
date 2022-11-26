import express from 'express'
import dotenv from 'dotenv'
import mongoose, { connect } from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'

// express
const app = express()
// dotenv
dotenv.config()
// mongoose
const dbConnect = async function () {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('MongoDB connected')
    } catch (error) {
        throw error
    }
}

// middlewares
app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/hotels', hotelsRoute)
app.use('/api/v1/rooms', roomsRoute)
app.use('/api/v1/users', usersRoute)

// error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    })
})

app.listen(process.env.PORT, () => {
    dbConnect()
    console.log("API running successfully.")
})