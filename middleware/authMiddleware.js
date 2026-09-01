import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
}

const clearTokenCookie = (res) => {
    res.cookie('token', '', {
        ...cookieOptions,
        expires: new Date(0),
    })
}

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.cookies?.token){
        token = req.cookies.token
    } else if (req.headers.authorization?.startsWith(`Bearer`)){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        clearTokenCookie(res)
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')

        if(!req.user){
            clearTokenCookie(res)
            res.status(401)
            throw new Error("Not authorized, user not found")
        }

        next()
    } catch (error){
        console.log("JWT error:", error.message)
        clearTokenCookie(res)
        res.status(401)
        throw new Error('You are not authorized')
    }
})

export { protect }