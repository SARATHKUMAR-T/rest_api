import { NextFunction, Request, Response } from "express";
import userServ from "../services/userService";

class middlewareController {
  private static instance: middlewareController;

  private constructor() {}

  public static getInstance(): middlewareController {
    if (!middlewareController.instance) {
      middlewareController.instance = new middlewareController();
    }
    return middlewareController.instance;
  }

  public async userCheck(
    req: Request,
    res: Response,
    next: NextFunction,
    val: String
  ) {
    try {
      await userServ.fetchUser(val.toString()).then((val) => {
        if (val.length > 0) {
          next();
        } else {
          return res.status(200).json({
            message: "No User Found Unable To Proceed Further Actions.",
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}

export const userMiddlewareInstance = middlewareController.getInstance();
