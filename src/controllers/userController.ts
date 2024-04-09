import { NextFunction, Request, Response } from "express";
import { userService } from "../services";

class UserController {
  private static instance: UserController;

  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.fetchUser(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async newUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.addUser(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.updateUser(req.body, req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.removeUser(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.userReport(req.params.id);
      if (result.data) return res.status(result.status).download(result.data);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async reportMailer(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.reportMail(
        req.params.id,
        req.body.mailTo
      );
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async fileUploader(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.fileHandler(req.params.id, req);
      if (result) {
        return res.status(result.status).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
  public async getBase64(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.fileBase64(req.params.id, res);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = UserController.getInstance();
