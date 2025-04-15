import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
dotenv.config()
// middleware
app.use( express.json() )
// router
app.use( "/api", router )

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.static(path.join(__dirname, 'src', 'public')))

app.use((err, req, res, next) => {
    console.log("Error", err)
    return res.status(500).json({
        errror : err.message
    })
})

const Port = process.env.Port || 8000
app.listen(Port, (req, res) => {
    console.log(`Server run at http://localhost:${Port}`)
})