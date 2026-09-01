import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/userController.js"; 
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router()

userRouter.post('/', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/current', protect, getCurrentUser)

userRouter.post('/logout', logoutUser)

export { userRouter }