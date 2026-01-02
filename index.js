
import express from 'express'
import cors from 'cors'
import config from 'dotenv/config'

import { db_connect } from './db.js'
import {aiRouter} from './routes/aiRoute.js'


const app =express()

app.use(cors())
app.use(express.json())

db_connect()

app.use('/ai',aiRouter)

const port=process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`server listening ${port}`)
})