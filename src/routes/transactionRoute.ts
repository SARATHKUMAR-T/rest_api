import { Router } from "express";
import { transactionControl } from "../controllers";
class TransactionRoute {
  private static instance: TransactionRoute;
  router = Router();
  private constructor() {
    this.initiateRoutes();
  }

  public static getInstance(): TransactionRoute {
    if (!TransactionRoute.instance) {
      TransactionRoute.instance = new TransactionRoute();
    }
    return TransactionRoute.instance;
  }
  initiateRoutes() {
    this.router
      .route("/transaction/:id")
      .post(transactionControl.addemployeeTransaction)
      .get(transactionControl.getUserTransaction)
      .patch(transactionControl.updateEmployeeTransaction)
      .delete(transactionControl.deleteEmployeeTransaction);
  }
}

export const transactionRouter = TransactionRoute.getInstance();
