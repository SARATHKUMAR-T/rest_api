import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db_connection";
import { User } from "../types/User";
import { Encrypter } from "../utils";
import { ApiResponse } from "../types/Response";
import { NextFunction, Response } from "express";
import { AppError } from "../errorHandler/appError";

class userService {
  private static instance: userService;

  private constructor() {}

  public static getInstance(): userService {
    if (!userService.instance) {
      userService.instance = new userService();
    }
    return userService.instance;
  }

  public async fetchUser(id: string, next: NextFunction) {
    try {
      const a: RowDataPacket[] = await new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM users WHERE user_id=${id}`,
          (err: QueryError, result: RowDataPacket[]) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      return a;
    } catch (error) {
      next(new AppError("Invalid Query", 500));
    }
  }

  public async addUser({
    first_name,
    last_name,
    email,
    password,
  }: User): Promise<ResultSetHeader> {
    password = Encrypter(password, 10);
    return await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (first_name,last_name,email,password_) VALUES ('${first_name}','${last_name}','${email}','${password}')`,
        (err: QueryError | null, result: ResultSetHeader) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  public async removeUser(id: string): Promise<ResultSetHeader> {
    return await new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM users WHERE user_id=${id}`,
        (err: QueryError | null, result: ResultSetHeader) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  public async updateUser(
    { first_name, last_name, email, password }: User,
    id: string
  ): Promise<ResultSetHeader> {
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
    return await new Promise((resolve, reject) => {
      db.query(sql, (err: QueryError | null, result: ResultSetHeader) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  public async userReport(id: string): Promise<RowDataPacket[]> {
    return await new Promise((resolve, reject) => {
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
        (err: QueryError | null, result: RowDataPacket[]) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}

const userServ = userService.getInstance();

export default userServ;
