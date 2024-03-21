import { Router } from "express";
import { deleteUser, getUser, loginUser, postUser, registerUser, updateUser } from "../controllers/userController.js";
import { noRoute } from "../controllers/errorRoute.js";

const userRouter = Router()

userRouter.route('/').get(getUser).post(postUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/register').post(registerUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
userRouter.route('*').all(noRoute)

export default userRouter