import { Router } from "express";
import { noRoute } from "../controllers/errorRoute.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/noteController.js";

const noteRouter = Router()


noteRouter.route('/').get(getNotes).post(createNote).delete(deleteNote)
noteRouter.route('/:id').get(getNotes).patch(updateNote).delete(deleteNote)
noteRouter.route('*').all(noRoute)

export default noteRouter