import mysql from "mysql2";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123",
// });

class DB {
  private connectionStatus: boolean = false;
  constructor(
    public host: string,
    public user: string,
    public password: string
  ) {}

  connection() {
    return new Promise((resolve, reject) => {
      resolve(
        mysql.createConnection({
          host: this.host,
          user: this.user,
          password: this.password,
        })
      );
    });
  }

  connect() {
    if (!this.connectionStatus) {
      this.connection()
        .then((res) => {
          console.log("Db connected successfully");
          console.log(res);
          this.connectionStatus = true;
        })
        .catch((err) => {
          console.log(err);
          console.log("unable to connect db");
          return err;
        });
    }
  }

  query(query: string, values: string | string[],setQuery():any) {}
}

export const db = new DB("localhost", "root", "123");
