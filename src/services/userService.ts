import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import path from "path";
import { db } from "../config/db_connection";
import { APIresponse } from "../types";
import { EmployeeInfo } from "../types/employee_info";
import { User } from "../types/user";
import { Encrypter, generateExcelBook } from "../utils";

class userService {
  private static instance: userService;

  private constructor() {}

  public static getInstance(): userService {
    if (!userService.instance) {
      userService.instance = new userService();
    }
    return userService.instance;
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
      return new APIresponse<RowDataPacket[]>(
        false,
        StatusCodes.OK,
        ReasonPhrases.OK,
        result
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
      return new APIresponse<number>(
        false,
        StatusCodes.OK,
        "user added successfully",
        result.insertId
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
}

const userServ = userService.getInstance();

export default userServ;
