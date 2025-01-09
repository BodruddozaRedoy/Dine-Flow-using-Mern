import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './utils/db.js'
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productRoute.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// mongodb
connectDB()

// middleware 
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "https://dine-flow-9cef9.web.app"],
    credentials: true
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server running")
})

// Routes 
app.use("/api/auth", authRouter)
app.use("/api", productRouter)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})