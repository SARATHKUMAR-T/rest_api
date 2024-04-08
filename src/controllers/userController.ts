import { NextFunction, Request, Response } from "express";
import { userService } from "../services";

class userController {
  private static instance: userController;

  private constructor() {}

  public static getInstance(): userController {
    if (!userController.instance) {
      userController.instance = new userController();
    }
    return userController.instance;
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
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // public async getBase64(req: Request, res: Response, next: NextFunction) {
  //   const id = req.params.id;
  //   try {
  //     const result = await userService.userReport(id);

  //     //  creation of excel sheet
  //     const workbook = new Excel.Workbook();
  //     const worksheet = workbook.addWorksheet("employee report");

  //     const reportColumns = [
  //       { key: "employee_id", header: "Employee Id" },
  //       { key: "user_name", header: "Employee Name" },
  //       { key: "role_", header: "Role" },
  //       { key: "address", header: "Address" },
  //       { key: "amount", header: "Salary" },
  //       { key: "payment_date", header: "Pay Date" },
  //     ];
  //     worksheet.columns = reportColumns;

  //     result.forEach((item: any) => {
  //       worksheet.addRow(item);
  //     });

  //     const filepath = path.format({
  //       dir: "./src/reports",
  //       base: `${result[0].user_name}'s report.xlsx`,
  //     });
  //     await workbook.xlsx.writeFile(filepath);
  //     fs.readFile(filepath, (err, data) => {
  //       if (err) {
  //         return res.status(500).json({ message: "unable to fetch report" });
  //       }
  //       const encoded = Base64.encode(data.toString());
  //       return res.status(200).json({
  //         File: encoded,
  //         message: "Report fetched successfully",
  //       });
  //     });
  //   } catch (error: Error | any) {
  //     console.log(error, "error while fetching report");
  //     next(new AppError(error.message, 404));
  //   }
  // }
}

export const userInstance = userController.getInstance();
