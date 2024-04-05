import { NextFunction, Request, Response } from "express";

class errorHandler {
  constructor() {}

  async globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export const erroHandle = new errorHandler();
