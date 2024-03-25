import express from "express";
import {
  deleteUser,
  newUser,
  updateUser,
  user,
} from "../controllers/userController";
import { checkUser } from "../middleware/userMiddleware";

export const userRouter = express.Router();

userRouter.post("/newuser", newUser);

userRouter
  .route("/user/:id")
  .get(user)
  .patch(checkUser, updateUser)
  .delete(checkUser, deleteUser);
