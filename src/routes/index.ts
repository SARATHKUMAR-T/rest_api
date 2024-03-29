import { Application, Request, Response } from "express";
import userRouter from "./userRoute";

export default class Routes {
  constructor(app: Application) {
    // user routes
    app.use("", userRouter);
    app.all("*", this.unhandledRouter);
  }
  // function for unhandled routes
  private unhandledRouter(req: Request, res: Response) {
    res.status(404).json({
      status: "fail",
      message: `cannot find ${req.originalUrl} on this server !`,
    });
  }
}
