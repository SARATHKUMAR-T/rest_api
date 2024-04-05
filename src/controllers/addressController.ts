import { NextFunction, Request, Response } from "express";
import { AddressService } from "../services";

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
      const result = await AddressService.getUserAddress(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async addUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AddressService.addUserAddress(
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
      const result = await AddressService.updateUserAddress(
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
      const result = await AddressService.deleteUserAddress(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const addressControl = addressController.getInstance();
