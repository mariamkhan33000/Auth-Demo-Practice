import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import {generateTokenAndSetCookie} from '../lib/utils/generatToken.js'

export const signUpUser = async (req, res) => {
    try {
        const { username, fullName, email, password} = req.body;
        if(!username || !fullName || !email || !password) {
            return res.status(400).json({error: "user not Found"})
        }
        const exisisting = await User.findOne({ username })
        if(exisisting) {
            return res.status(400).json({error: "username is already exisit"})
        }
        const existEmail = await User.findOne({ email })
        if(existEmail) {
            return res.status(400).json({error: "email already exisit"})
        }
        if(password.length < 6) {
            return res.status(400).json({error: "Password at lest 6 Numbers"})
        }

        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            username,
            fullName,
            email,
            password: hashPassword
        })

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                following: newUser.following,
                followers: newUser.followers,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        } else {
            return res.status(400).json({error: "Invalid User Data"})
        }
    } catch (error) {
        console.log("Error in Signup Controller",error.message)
        res.status(500).json({error: "User not SignUp"})
    }
}

export const logInUser = async (req, res) => {
    try {
     const {username, password} = req.body;
     const user = await userModel.findOne({ username })
     const isPassword = await bcrypt.compare(password, user?.password || "")
 
     if (!user || !isPassword){
        return res.status(400).json({error: "Invalid Username or password"})
     }
     genTokenAndSetCookie(user._id, res)
 
     res.status(200).json({
                 _id: user._id,
                 fullName: user.fullName,
                 email: user.email,
                 followers: user.followers,
                 following: user.following,
                 profileImg: user.profileImg,
                 coverImg: user.coverImg
             })
    } catch (error) {
     console.log("Error in LogIn Controller",error.message)
         res.status(500).json({error: "User not Login"})
    }
 }

export const logOutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log("Error in Login Controller",error.message)
        res.status(500).json({error: "User not Logout"})
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json({user})
    } catch (error) {
        console.log("Error in GetMe Controller",error.message)
        res.json({error: "User not Getme"})
    }
}
