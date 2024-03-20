import { Router } from "express";
import { noRoute } from "../controllers/errorRoute.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/noteController.js";
import auth from '../middlewares/authMiddleware.js'

const noteRouter = Router()

noteRouter.use(auth)
noteRouter.route('/').get(getNotes).post(createNote)
noteRouter.route('/:id').get(getNotes).patch(updateNote).delete(deleteNote)
noteRouter.route('*').all(noRoute)

export default noteRouter