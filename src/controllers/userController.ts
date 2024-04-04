import Excel from "exceljs";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { Base64 } from "js-base64";
import * as path from "path";
import { AppError } from "../errorHandler/appError";
import userServ from "../services/userService";
import { User } from "../types/User";
import { ApiResponse } from "../types";
import { RowDataPacket } from "mysql2";
import { generateExcelBook } from "../utils";

class userController {
  private static instance: userController;

  private constructor() {}

  public static getInstance(): userController {
    if (!userController.instance) {
      userController.instance = new userController();
    }
    return userController.instance;
  }

  // get user
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const a1 = await userServ.fetchUser(id, next);
      const response: ApiResponse<RowDataPacket[]> = {
        isError: false,
        message: "user fetched successfully",
        data: a1,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error, "from controller side");
    }
  }

  // adding new user
  public async newUser(req: Request, res: Response) {
    let { first_name, last_name, email, password }: User = req.body;
    try {
      await userServ
        .addUser({
          first_name,
          last_name,
          email,
          password,
        })
        .then((val) => {
          return res.status(200).json({
            status: "true",
            message: "user added successfully",
            user_id: val.insertId,
          });
        });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  // updating user
  public async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await userServ.updateUser(req.body, id).then((val) => {
        res.status(200).json({
          status: "true",
          message: "user updation successfull",
          value: val.affectedRows,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }

  // deleting user
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      await userServ.removeUser(id).then((val) => {
        res.status(200).json({
          status: "true",
          message: "User Deleted Successfully",
          value: val.affectedRows,
        });
      });
    } catch (error: Error | any) {
      next(new AppError(error.message, 404));
    }
  }

  // get report
  public async getReport(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await userServ.userReport(id);
      const workbook = generateExcelBook(
        "employee report",
        [
          { key: "employee_id", header: "Employee Id" },
          { key: "user_name", header: "Employee Name" },
          { key: "role_", header: "Role" },
          { key: "address", header: "Address" },
          { key: "amount", header: "Salary" },
          { key: "payment_date", header: "Pay Date" },
        ],
        result
      );

      const filepath = path.format({
        dir: "./src/reports",
        base: `${result[0].user_name}'s report.xlsx`,
      });

      // workbook.xlsx.write(res);

      // const rs = res.status(200);

      await workbook.xlsx.writeFile(filepath);
      return res.status(200).download(filepath, (err) => {
        console.log(err);
        console.log("file not downloaded");
      });
    } catch (error) {
      console.log(error, "error while fetching report");
    }
  }

  // get report base64

  public async getBase64(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await userServ.userReport(id);

      //  creation of excel sheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet("employee report");

      const reportColumns = [
        { key: "employee_id", header: "Employee Id" },
        { key: "user_name", header: "Employee Name" },
        { key: "role_", header: "Role" },
        { key: "address", header: "Address" },
        { key: "amount", header: "Salary" },
        { key: "payment_date", header: "Pay Date" },
      ];
      worksheet.columns = reportColumns;

      result.forEach((item: any) => {
        worksheet.addRow(item);
      });

      const filepath = path.format({
        dir: "./src/reports",
        base: `${result[0].user_name}'s report.xlsx`,
      });
      await workbook.xlsx.writeFile(filepath);
      fs.readFile(filepath, (err, data) => {
        if (err) {
          return res.status(500).json({ message: "unable to fetch report" });
        }
        const encoded = Base64.encode(data.toString());
        return res.status(200).json({
          File: encoded,
          message: "Report fetched successfully",
        });
      });
    } catch (error) {
      console.log(error, "error while fetching report");
    }
  }
}

const userInstance = userController.getInstance();

export default userInstance;
