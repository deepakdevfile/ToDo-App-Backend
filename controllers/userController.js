import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const registerUser = asyncHandler( async(req, res) => {
    
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        throw new Error("All fields are required");
    }

    const userExits = await User.findOne({ email })

    if(userExits){
        res.status(400).redirect('/login')
        throw new Error("User Exits")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword })

    if(user){
        res.status(200).json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id) })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(!user){
        res.status(400)
        throw new Error("No user exists, please sign up")
    }

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id) })
    } else {
        res.status(400)
        throw new Error("Invalid Data")
    }
})

const getCurrentUser = asyncHandler( async(req, res) => {
    
    res.json({ message: 'Current user data'})
})

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d'});

export { registerUser, loginUser, getCurrentUser }