import express from 'express'
import {signUpUser, logInUser, logOutUser, getMe} from '../authController/authController.js'
import { protectRoute } from '../middleware/protectiveRoutes.js'
const router = express.Router()

router.get('/me',protectRoute, getMe)

router.post('/signup',  signUpUser)

router.post('/login', logInUser)

router.post('/logout', logOutUser)

export default router 