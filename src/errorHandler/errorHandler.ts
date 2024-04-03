import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

class errorHandler {
  constructor() {}

  async globalErrorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    return res.status(err.statusCode).json({
      status: err.stack,
      message: err.message,
    });
  }
}

export const erroHandle = new errorHandler();
