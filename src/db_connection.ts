import mysql from "mysql2";
import util from "util";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
});

export const query = util.promisify(db.query).bind(db);
