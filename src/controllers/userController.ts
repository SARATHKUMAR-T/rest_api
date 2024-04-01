import Excel from "exceljs";
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import * as path from "path";
import { db } from "../db_connection";
import userServ from "../services/userService";
import { User } from "../types/types";
import Encrypter from "../utils/bcrypter";

export default class userController {
  constructor() {}

  // get user
  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      // calling service layer
      const result = await userServ.fetchUser(id);
      return res.status(200).json({
        status: "true",
        message: "user fetched successfully",
        user: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }

  // adding new user
  async newUser(req: Request, res: Response) {
    let { first_name, last_name, email, password }: User = req.body;
    try {
      const result = await userServ.addUser({
        first_name,
        last_name,
        email,
        password,
      });
      console.log(result, "result for adding user");
      return res.status(200).json({
        status: "true",
        message: "user added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
  // updating user
  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await userServ.updateUser(req.body, id);
      res.status(200).json({
        status: "true",
        message: "user updation successfull",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }

  // deleting user
  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await userServ.removeUser(id);
      res.status(200).json({
        status: "true",
        message: "User Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }

  // get report
  async getReport(req: Request, res: Response) {
    const id = req.params.id;
    try {
      db.query(
        `SELECT 
    CONCAT(users.first_name, " ", users.last_name) AS user_name,
    employee_info.employee_id,
    employee_info.role_,
    address.address,
    employee_info.employee_id ,
	   transactions.amount,
    transactions.payment_date
FROM 
    users
INNER JOIN 
    address ON users.user_id = address.user_id
INNER JOIN 
    employee_info ON users.user_id = employee_info.user_id
INNER JOIN 
    transactions ON employee_info.employee_id = transactions.employee_id
WHERE 
users.user_id = ${id}
;
`,
        async (err, result: any) => {
          if (err) throw new Error("Error occurred while deleting user");
          else {
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

            return res.status(200).json({
              message: "Report fetched successfully",
              file: filepath,
              result,
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}
