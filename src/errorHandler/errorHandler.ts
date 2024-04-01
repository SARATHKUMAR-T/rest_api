import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

class errorHandler {
  constructor() {}

  async globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
}

export default errorHandler;
