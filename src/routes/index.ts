import { Application, NextFunction, Request, Response } from "express";
import userRouter from "./userRoute";
import { AppError } from "../errorHandler/appError";
import { erroHandle } from "../errorHandler/errorHandler";

export default class Routes {
  constructor(app: Application) {
    // user routes
    app.use("", userRouter);
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
    });

    app.use(erroHandle.globalErrorHandler);
  }
}
