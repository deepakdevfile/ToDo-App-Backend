import express from "express";
import { deleteTasks, getTasks, setTasks, updateTasks } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get('/', getTasks);

taskRouter.post('/', setTasks);

taskRouter.put('/:id', updateTasks);

taskRouter.delete('/:id', deleteTasks);

export { taskRouter};