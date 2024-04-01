import { Application, Request, Response } from "express";
import userRouter from "./userRoute";
import errorHandler from "../errorHandler/errorHandler";

export default class Routes {
  erroHandler = new errorHandler();
  constructor(app: Application) {
    // user routes

    app.use("", userRouter);
    app.all("*", (req, res, next) => {
      const err: any = new Error(
        `cannot find ${req.originalUrl} on this server`
      );
      err.status = "fail";
      err.statusCode = 404;
    });
  }
}
