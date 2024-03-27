import { Application } from "express";
import userRouter from "./userRoute";

export default class Routes {
  constructor(app: Application) {
    // user routes
    app.use("", userRouter);
  }
}
