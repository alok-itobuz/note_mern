import { PORT } from './config/config.js'
import * as conn from './db/conn.js'
import express from 'express'
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'

const app = express()


// middlewares
app.use(express.json())

// routes
app.use('/api/user', userRouter)
app.use('/api/note', noteRouter)


app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})