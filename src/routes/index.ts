import { Application, NextFunction, Request, Response } from "express";
import { erroHandle } from "../middlewares/errorHandlerMiddleware";
import { userRouter } from "./userRoute";
import { addressRouter } from "./addressRoute";
import { transactionRouter } from "./transactionRoute";
import { employeeInfoRouter } from "./employeeInfoRoute";
import { userMiddlewareInstance } from "../middlewares/userMiddleware";

export default class Routes {
  constructor(app: Application) {
    app.use("", userRouter.router);
    app.use("", userMiddlewareInstance.authMiddleware, addressRouter.router);
    app.use(
      "",
      userMiddlewareInstance.authMiddleware,
      transactionRouter.router
    );
    app.use(
      "",
      userMiddlewareInstance.authMiddleware,
      employeeInfoRouter.router
    );
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new Error("cannot found this route"));
    });

    app.use(erroHandle.globalErrorHandler);
  }
}
