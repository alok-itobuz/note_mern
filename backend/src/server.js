import { PORT } from "./config/config.js";
import connectDB from "./db/conn.js";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import cors from 'cors'

connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);
app.use(({ error, status }, req, res, next) => {
  console.log(error);
  res.status(StatusCodes[status]).json({
    data: null,
    message: error.message,
    status: ReasonPhrases[status],
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
