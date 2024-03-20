import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controllers/userController.js";
import { noRoute } from "../controllers/errorRoute.js";

const userRouter = Router()

userRouter.route('/').get(getUser).post(postUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
userRouter.route('*').all(noRoute)

export default userRouter