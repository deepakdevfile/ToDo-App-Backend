import express from "express";
import { deleteTasks, getTasks, setTasks, updateTasks } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.get('/', protect, getTasks);

taskRouter.post('/', protect, setTasks);

taskRouter.put('/:id', protect, updateTasks);

taskRouter.delete('/:id', protect, deleteTasks);

export { taskRouter};