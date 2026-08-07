import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/userController.js"; 

const userRouter = express.Router()

userRouter.post('/', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/current', getCurrentUser)

export { userRouter }