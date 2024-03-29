import { Router } from "express";
import { noRoute } from "../controllers/errorRoute.js";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const noteRouter = Router();

noteRouter.use(authMiddleware);

// search[title]=note2&sort=true&page=4&limit=5&updated=true
noteRouter
  .route("/")
  .get(getNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);
noteRouter.route("/:id").get(getNotes).patch(updateNote).delete(deleteNote);
noteRouter.route("*").all(noRoute);

export default noteRouter;
