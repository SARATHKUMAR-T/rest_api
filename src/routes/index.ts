import { Application, NextFunction, Request, Response } from "express";
import { erroHandler } from "../middlewares/errorHandlerMiddleware";
import { addressRouter } from "./addressRoute";
import { employeeInfoRouter } from "./employeeInfoRoute";
import { transactionRouter } from "./transactionRoute";
import { userRouter } from "./userRoute";
import { userMiddleware } from "../middlewares";

export default class Routes {
  constructor(app: Application) {
    app.use("", userRouter.router);
    app.use(userMiddleware.authMiddleware);
    app.use("", addressRouter.router);
    app.use("", transactionRouter.router);
    app.use("", employeeInfoRouter.router);
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new Error("cannot found this route"));
    });

    app.use(erroHandler.globalErrorHandler);
  }
}
