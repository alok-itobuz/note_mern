import { Router } from "express";
import {
  deleteUser,
  loginUser,
  logout,
  logoutAll,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { noRoute } from "../controllers/errorRoute.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter
  .route("/")
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/register").post(registerUser);

userRouter.route("/logout").delete(authMiddleware, logout);

userRouter.route("/logout-all").delete(authMiddleware, logoutAll);

userRouter.route("*").all(noRoute);

export default userRouter;
