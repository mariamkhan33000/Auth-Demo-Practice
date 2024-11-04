import express from 'express'

import authRoutes from './routes/authRoutes.js'
import Color from 'color'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
dotenv.config()
connectDb()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use('/api/v3/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`The server is runnig on the Port :${PORT}`.bgWhite)
})