import { Application, NextFunction, Request, Response } from "express";
import { erroHandler } from "../middlewares/errorHandlerMiddleware";
import { employeeInfoRouter } from "./employeeInfoRoute";
import { redisRouter } from "./redisRoute";
import { transactionRouter } from "./transactionRoute";
import { userRouter } from "./userRoute";
import { userMiddleware } from "../middlewares";

export default class Routes {
  constructor(app: Application) {
    app.use("", redisRouter.router);
    app.use("", userRouter.router);
    app.use(userMiddleware.authMiddleware);
    app.use("", transactionRouter.router);
    app.use("", employeeInfoRouter.router);
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new Error("cannot found this route"));
    });

    app.use(erroHandler.globalErrorHandler);
  }
}
