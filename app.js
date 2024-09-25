import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: 'https://tender-managment.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

import userRouter from './routes/user.routes.js'
import tenderRouter from './routes/tender.routes.js'
import bidRouter from './routes/bid.routes.js'

app.use('/api/v1/users',userRouter)
app.use('/api/v1/tender',tenderRouter)
app.use('/api/v1/bid',bidRouter)

export { app }