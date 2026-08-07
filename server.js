import express from 'express';
import dotenv from 'dotenv/config';
import {router} from './routes/taskRoutes.js';
import {errorHandler} from './middleware/errorMiddleware.js';
import { connectDB } from './connect/database.js';

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api/tasks', router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})