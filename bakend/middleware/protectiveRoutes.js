import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token) {
            return res.status(400).json({error: "Unauther No token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(400).json({error: "Unauther token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({error: "User Not found"})
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("Error in Login Controller",error.message)
        res.status(500).json({error: "Interval Server Error"})
    }
}