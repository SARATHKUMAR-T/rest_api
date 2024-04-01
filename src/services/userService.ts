import { RowDataPacket } from "mysql2";
import { db, query } from "../db_connection";
import { User } from "../types/types";
import Encrypter from "../utils/bcrypter";

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
    const sql = `SELECT * FROM users WHERE user_id=${id}`;
    return await query({ sql });
  }

  public async addUser({
    first_name,
    last_name,
    email,
    password,
  }: User): Promise<unknown> {
    const sql = `INSERT INTO users (first_name,last_name,email,password_) VALUES ('${first_name}','${last_name}','${email}','${password}')`;
    return await query({ sql });
  }

  public async removeUser(id: string) {
    const sql = `DELETE FROM users WHERE user_id=${id}`;
    return await query({ sql });
  }

  public async updateUser(
    { first_name, last_name, email, password }: User,
    id: string
  ) {
    console.log("update triggered");

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
      sql += ` password_ = '${password}',`;
    }
    sql = sql.slice(0, -1);
    sql += ` WHERE user_id = ${id}`;
    return await query({ sql });
  }
}

const userServ = userService.getInstance();

export default userServ;
