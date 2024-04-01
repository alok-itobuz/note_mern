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

// update: =>  (title, description) or (idArray, isHidden: (it's for make hidden or visible))

// delete: isHidden=true (all hidden will be deleted)
noteRouter
  .route("/")
  .get(getNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);

// delete: only one note which id is mentioned will be deleted
noteRouter.route("/:id").get(getNotes).patch(updateNote).delete(deleteNote);
noteRouter.route("*").all(noRoute);

export default noteRouter;
