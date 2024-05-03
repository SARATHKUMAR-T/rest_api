import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import fs from "fs";

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
  public async regex(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.regexCheck(req.body.value);
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
  public async sendEmployeeReports(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await userService.reportSender(req.body.employees);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async getReportStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await userService.reportStatus(req.params.id);
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
  public async videoStreaming(req: Request, res: Response, next: NextFunction) {
    try {
      const videoPath = "./src/reports/sora.mp4";
      res.status(206).header({ "content-type": "video/mp4" });
      const file = fs.createReadStream(videoPath);
      file.pipe(res);
      file.on("data", (data) => {
        console.log(data);
        console.log("______________________________");
      });

      file.on("end", () => {
        console.log("video streaming ended");
      });

      console.log(file, "file");

      console.log("video streaming");
    } catch (error) {
      next(error);
    }
  }
}

export const userController = UserController.getInstance();
