import { NextFunction, Request, Response } from "express";
import { transactionService } from "../services";

class transactionController {
  private static instance: transactionController;

  private constructor() {}

  public static getInstance(): transactionController {
    if (!transactionController.instance) {
      transactionController.instance = new transactionController();
    }
    return transactionController.instance;
  }

  public async getUserTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await transactionService.fetchTransaction(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async addemployeeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await transactionService.addTransaction(
        req.params.id,
        req.body
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async updateEmployeeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await transactionService.updateTransaction(
        req.params.id,
        req.body
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteEmployeeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await transactionService.deleteTransaction(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const transactionControl = transactionController.getInstance();
