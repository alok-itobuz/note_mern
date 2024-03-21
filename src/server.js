import { PORT } from './config/config.js'
import connectDB from './db/conn.js'
import express from 'express'
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'
import authMiddleware from './middlewares/authMiddleware.js'
import { noRoute } from './controllers/errorRoute.js'

connectDB()

const app = express()


// middlewares
app.use(express.json())

// routes
app.use('/api/user', userRouter)
app.use('/api/note', authMiddleware, noteRouter)
app.use('*', noRoute)


app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})