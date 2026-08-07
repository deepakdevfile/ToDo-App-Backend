import express from "express";
import { deleteTasks, getTasks, setTasks, updateTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get('/', getTasks);

router.post('/', setTasks);

router.put('/:id', updateTasks);

router.delete('/:id', deleteTasks);

export {router};