import express from 'express';
import dotenv from 'dotenv/config';
import { taskRouter } from './routes/taskRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './connect/database.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})