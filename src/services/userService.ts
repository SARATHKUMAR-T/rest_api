import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import path from "path";
import { db } from "../config/db_connection";
import { APIresponse } from "../types";
import { User } from "../types/user";
import Excel from "exceljs";
import {
  Encrypter,
  generateExcelBook,
  mailerGenerator,
  tokenGenerator,
} from "../utils";
import "dotenv/config";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async fetchUser(id: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(
        `SELECT * FROM users WHERE user_id=${id} AND active=1`
      );
      if (result.length === 0) {
        return new APIresponse<null>(
          true,
          StatusCodes.NOT_FOUND,
          "No user Found"
        );
      }
      const token = tokenGenerator(
        { id: result[0].user_id },
        process.env.SECRET_KEY ? process.env.SECRET_KEY : "sfd"
      );

      return new APIresponse<RowDataPacket[]>(
        false,
        StatusCodes.OK,
        ReasonPhrases.OK,
        result,
        token
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async addUser(user: User) {
    try {
      user.password = Encrypter(user.password, 10);
      const [result] = await db.query<ResultSetHeader>(
        `INSERT INTO users (first_name,last_name,email,password_) VALUES ('${user.first_name}','${user.last_name}','${user.email}','${user.password}')`
      );

      const token = tokenGenerator(
        { id: result.insertId },
        process.env.SECRET_KEY ? process.env.SECRET_KEY : "sfd"
      );
      return new APIresponse<string>(
        false,
        StatusCodes.OK,
        "user added successfully",
        token
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async removeUser(id: string) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE users SET active=0 WHERE user_id=${id}`
      );
      return new APIresponse<null>(false, StatusCodes.OK, ReasonPhrases.OK);
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async updateUser(
    { first_name, last_name, email, password }: User,
    id: string
  ) {
    try {
      let sql = `UPDATE users SET`;
      if (first_name) {
        sql += ` first_name = '${first_name}',`;
      }
      if (last_name) {
        sql += ` last_name = '${last_name}',`;
      }
      if (email) {
        sql += ` email = '${email}',`;
      }
      if (password) {
        password = Encrypter(password, 10);
        sql += ` password_ = '${password}',`;
      }
      sql = sql.slice(0, -1);
      sql += ` WHERE user_id = ${id}`;
      const [result] = await db.query<ResultSetHeader>(sql);
      return new APIresponse<null>(false, StatusCodes.OK, ReasonPhrases.OK);
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async userReport(id: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(`SELECT 
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
`);
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

      await workbook.xlsx.writeFile(filepath);

      return new APIresponse<string>(
        false,
        StatusCodes.OK,
        ReasonPhrases.OK,
        filepath
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
  public async reportMail(id: string, mailTo: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(`SELECT 
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
`);
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

      await workbook.xlsx.writeFile(filepath);
      console.log(filepath);

      mailerGenerator("spellbee931@gmail.com", "iyodaocmlnjdrhkj", {
        from: "spellbee931@gmail.com",
        to: mailTo,
        subject: `${result[0].user_name}-Report`,
        attachments: [
          {
            path: "./src/reports/saravanan S FORD's report.xlsx",
          },
        ],
      });

      return new APIresponse<null>(
        false,
        StatusCodes.OK,
        "email send successfully"
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  async fileHandler(
    id: string,
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ) {
    try {
      const file = req.file;
      if (file?.mimetype.includes("spreadsheetml")) {
        console.log(req.file, "file");
        const workbook = new Excel.Workbook();
        const excel = await workbook.xlsx.readFile(file.path);
        let allValues: any = [];
        excel.eachSheet(function (worksheet, id) {
          worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.values;
            if (rowNumber !== 1) {
              allValues.push(row.values);
            }
          });
        });
        const valueArray = allValues.map((item: any) => {
          return [item[1], item[2], "2022-01-11"];
        });
        console.log(valueArray);

        const [result] = await db.query<ResultSetHeader>(
          "INSERT INTO transactions (employee_id,amount,payment_date) VALUES ?",
          [valueArray]
        );
        if (result.affectedRows > 1) {
          return new APIresponse<null>(
            false,
            StatusCodes.OK,
            "data uploaded successfully"
          );
        } else {
          throw new Error("unable to upload data");
        }
      }

      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        "unsupported file format"
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
}

export const userService = UserService.getInstance();
