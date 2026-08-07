import asyncHandler from "express-async-handler";

const registerUser = asyncHandler( async(req, res) => {
    res.json({ message: "Registered user successfully"})
})

const loginUser = asyncHandler( async(req, res) => {
    res.json({ message: 'Logged in User successfully'})
})

const getCurrentUser = asyncHandler( async(req, res) => {
    res.json({ message: 'Current user data'})
})

export { registerUser, loginUser, getCurrentUser }