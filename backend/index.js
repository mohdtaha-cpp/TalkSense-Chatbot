import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cors from "cors";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/admin",adminRoutes)

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectToDb()
})