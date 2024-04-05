import { Router } from "express";
import { employeeController } from "../controllers";
class EmployeeInfoRoute {
  private static instance: EmployeeInfoRoute;
  router = Router();
  private constructor() {
    this.initiateRoutes();
  }

  public static getInstance(): EmployeeInfoRoute {
    if (!EmployeeInfoRoute.instance) {
      EmployeeInfoRoute.instance = new EmployeeInfoRoute();
    }
    return EmployeeInfoRoute.instance;
  }
  initiateRoutes() {
    this.router
      .route("/info/:id")
      .post(employeeController.addEmployeeDetails)
      .get(employeeController.getEmployeeDetails)
      .patch(employeeController.updateEmployeeDetails)
      .delete(employeeController.deleteEmployeeDetails);
  }
}

export const employeeInfoRouter = EmployeeInfoRoute.getInstance();
