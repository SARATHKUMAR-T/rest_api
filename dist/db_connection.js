"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123",
// });
class DB {
    constructor(host, user, password) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.connectionStatus = false;
    }
    connection() {
        return new Promise((resolve, reject) => {
            resolve(mysql2_1.default.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
            }));
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
}
() => ;
{ }
exports.db = new DB("localhost", "root", "123");
