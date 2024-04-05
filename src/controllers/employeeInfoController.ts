import { NextFunction, Request, Response } from "express";
import { EmployeeInfoService } from "../services";

class employeeInfoController {
  private static instance: employeeInfoController;

  private constructor() {}

  public static getInstance(): employeeInfoController {
    if (!employeeInfoController.instance) {
      employeeInfoController.instance = new employeeInfoController();
    }
    return employeeInfoController.instance;
  }

  public async getEmployeeDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await EmployeeInfoService.fetchEmployeeInfo(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async addEmployeeDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await EmployeeInfoService.addEmployeeInfo(
        req.params.id,
        req.body
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async updateEmployeeDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await EmployeeInfoService.updateEmployeeInfo(
        req.params.id,
        req.body
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteEmployeeDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await EmployeeInfoService.removeEmployeeInfo(
        req.params.id
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const employeeController = employeeInfoController.getInstance();
