import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RowDataPacket } from "mysql2";
import { db } from "../config/db_connection";
import { APIresponse, Transaction } from "../types";

class TransactionServ {
  private static instance: TransactionServ;

  private constructor() {}

  public static getInstance(): TransactionServ {
    if (!TransactionServ.instance) {
      TransactionServ.instance = new TransactionServ();
    }
    return TransactionServ.instance;
  }

  async fetchTransaction(id: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(
        `SELECT * FROM transactions WHERE employee_id=${id} AND active=1`
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

  async addTransaction(id: string, transaction: Transaction) {
    try {
      const [result] = await db.query(
        `INSERT INTO transactions (employee_id,amount,payment_date) VALUES (${id},${transaction.amount},'${transaction.payment_date}')`
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

  async updateTransaction(id: string, transaction: Transaction) {
    try {
      let sql = `UPDATE transactions SET`;
      if (transaction.amount) {
        sql += ` amount = ${transaction.amount},`;
      }
      if (transaction.payment_date) {
        sql += ` payment_date = '${transaction.payment_date}',`;
      }
      sql = sql.slice(0, -1);
      sql += ` WHERE employee_id = ${id}`;
      const [result] = await db.query(sql);
      return new APIresponse<null>(false, StatusCodes.OK, ReasonPhrases.OK);
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  async deleteTransaction(id: string) {
    try {
      const [result] = await db.query(
        `UPDATE transactions SET active=0 WHERE employee_id=${id} `
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
}

export const transactionService = TransactionServ.getInstance();
