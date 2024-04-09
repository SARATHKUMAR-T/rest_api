import { NextFunction, Request, Response } from "express";
import { tokenDecoder } from "../utils";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";
import { userService } from "../services";
import { APIresponse } from "../types";

class MiddlewareController {
  private static instance: MiddlewareController;

  private constructor() {}

  public static getInstance(): MiddlewareController {
    if (!MiddlewareController.instance) {
      MiddlewareController.instance = new MiddlewareController();
    }
    return MiddlewareController.instance;
  }

  public async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers["x-auth-token"]) {
        const token = req.headers["x-auth-token"];
        if (typeof token === "string") {
          const decoded: any = tokenDecoder(token);
          const result = await userService.fetchUser(decoded.id);
          if ((result.status = 200)) next();
          else {
            return res.status(result.status).json(result);
          }
        }
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new APIresponse<null>(
              true,
              StatusCodes.UNAUTHORIZED,
              "invaild token"
            )
          );
      }
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddleware = MiddlewareController.getInstance();
