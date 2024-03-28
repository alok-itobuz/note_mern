import { config } from "dotenv";
config()

const { PORT, MONGODB_URL, JWT_SECRET, SALT } = process.env

export { PORT, MONGODB_URL, JWT_SECRET, SALT }