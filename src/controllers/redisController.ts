import { NextFunction, Request, Response } from "express";
import { redisService } from "../services";

class RedisController {
  private static instance: RedisController;

  private constructor() {}

  public static getInstance(): RedisController {
    if (!RedisController.instance) {
      RedisController.instance = new RedisController();
    }
    return RedisController.instance;
  }

  public async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await redisService.addUser(
        req.body.userName,
        req.body.location,
        req.body.salary * 1
      );
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await redisService.getUser(req.body.key);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const redisController = RedisController.getInstance();
