import { NextFunction, Request, Response } from "express";
import { tokenDecoder } from "../utils";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";
import { userService } from "../services";

class middlewareController {
  private static instance: middlewareController;

  private constructor() {}

  public static getInstance(): middlewareController {
    if (!middlewareController.instance) {
      middlewareController.instance = new middlewareController();
    }
    return middlewareController.instance;
  }

  public async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers["x-auth-token"]) {
        const token = req.headers["x-auth-token"];
        if (typeof token === "string") {
          const decoded: any = tokenDecoder(
            token,
            process.env.SECRET_KEY ? process.env.SECRET_KEY : "sfd"
          );
          const result = await userService.fetchUser(decoded.id);
          if ((result.status = 200)) next();
          else {
            return res.status(result.status).json(result);
          }
        }
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid token",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddlewareInstance = middlewareController.getInstance();
