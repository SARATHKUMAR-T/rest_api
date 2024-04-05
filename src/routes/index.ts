import { Application, NextFunction, Request, Response } from "express";
import { erroHandle } from "../middlewares/errorHandlerMiddleware";
import { userRouter } from "./userRoute";
import { addressRouter } from "./addressRoute";
import { transactionRouter } from "./transactionRoute";
import { employeeInfoRouter } from "./employeeInfoRoute";

export default class Routes {
  constructor(app: Application) {
    app.use("", userRouter.router);
    app.use("", addressRouter.router);
    app.use("", transactionRouter.router);
    app.use("", employeeInfoRouter.router);
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new Error("cannot found this route"));
    });

    app.use(erroHandle.globalErrorHandler);
  }
}
