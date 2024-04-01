import { NextFunction, Request, Response } from "express";
import { db } from "../db_connection";
import { RowDataPacket } from "mysql2";

export default class middlewareController {
  constructor() {}
  async userCheck(
    req: Request,
    res: Response,
    next: NextFunction,
    val: String
  ) {
    try {
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [val],
        (err, result: RowDataPacket[]): Response | void => {
          if (err)
            throw new Error("Error occuried while fetching user details");
          else {
            if (result.length === 0) {
              return res.status(200).json({
                message: "No User Found Unable To Proceed Further Actions.",
              });
            } else {
              next();
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}
