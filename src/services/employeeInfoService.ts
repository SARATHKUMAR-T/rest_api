import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db_connection";
import { APIresponse } from "../types";
import { EmployeeInfo } from "../types/employee_info";

class EmployeeInfoServ {
  private static instance: EmployeeInfoServ;
  private constructor() {}

  public static getInstance(): EmployeeInfoServ {
    if (!EmployeeInfoServ.instance) {
      EmployeeInfoServ.instance = new EmployeeInfoServ();
    }
    return EmployeeInfoServ.instance;
  }

  public async fetchEmployeeInfo(id: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(
        `SELECT * FROM employee_info WHERE employee_id=${id} AND active=1`
      );
      if (result.length === 0) {
        return new APIresponse<null>(
          true,
          StatusCodes.NOT_FOUND,
          ReasonPhrases.NOT_FOUND
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

  async addEmployeeInfo(id: string, info: EmployeeInfo) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `INSERT INTO employee_info (user_id,role_,join_date,employee_id)
        VALUES (${id},'${info.role_}','${info.join_date}',${info.employee_id})
        `
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

  async removeEmployeeInfo(id: string) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE employee_info SET active=0 WHERE employee_id=${id}`
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

  async updateEmployeeInfo(id: string, info: EmployeeInfo) {
    try {
      let sql = `UPDATE employee_info SET`;
      if (info.employee_id) {
        sql += ` employee_id = '${info.employee_id}',`;
      }
      if (info.join_date) {
        sql += ` join_date = '${info.join_date}',`;
      }
      if (info.relive_date) {
        sql += ` relive_date = '${info.relive_date}',`;
      }
      if (info.role_) {
        sql += ` role_ = '${info.role_}',`;
      }
      sql = sql.slice(0, -1);
      sql += ` WHERE employee_id = ${id}`;
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
}

export const EmployeeInfoService = EmployeeInfoServ.getInstance();
