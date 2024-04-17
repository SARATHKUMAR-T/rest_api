import { NextFunction, Request, Response } from "express";
import { AddressServiceS1 } from "../services/addressS1";

class addressController {
  private static instance: addressController;

  private constructor() {}

  public static getInstance(): addressController {
    if (!addressController.instance) {
      addressController.instance = new addressController();
    }
    return addressController.instance;
  }

  public async getUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AddressServiceS1.getUserAddress(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async addUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AddressServiceS1.addUserAddress(
        req.params.id,
        req.body.address
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async updateUserAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AddressServiceS1.updateUserAddress(
        req.params.id,
        req.body.address
      );
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUserAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await AddressServiceS1.deleteUserAddress(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const addressControl = addressController.getInstance();
