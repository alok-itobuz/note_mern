import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

mongoose.connect(`${MONGODB_URL}/practice`).then(data => {
    console.log('Successfully connected to database')
}).catch(error => {
    console.log('Error connecting to database', error)
})