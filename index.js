
import express from 'express'
import cors from 'cors'
import config from 'dotenv/config'

import { db_connect } from './db.js'
import {aiRouter} from './routes/aiRoute.js'


const app =express()

app.use(cors({
    origin:process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5000"
}))
app.use(express.json())

db_connect()

app.use('/ai',aiRouter)

const port=process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`server listening ${port}`)
})
