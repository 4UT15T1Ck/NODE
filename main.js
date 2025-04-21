import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import router from './src/routes/index.js'
import db from './src/database/mongodb.js'

const app = express()
dotenv.config()

const __dirname = path.resolve()

app.use(express.json())

app.set('view engine', 'ejs')

app.use("/api", router)

app.use((err, req, res, next) => {
    console.error("Error", err)
    return res.status(500).json({
        error: err.message
    })
})

const startServer = async ()=>{
    try {
        await db.connectDB();
        console.log("MongoDB server started");
    } catch (error) {
        console.error("Error starting server:", error)
        throw error;
        
    }
}
startServer();

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`🚀 Server run at http://localhost:${PORT}`)
})
