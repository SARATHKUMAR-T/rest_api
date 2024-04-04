"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../config/db_connection");
const utils_1 = require("../utils");
const appError_1 = require("../errorHandler/appError");
class userService {
    constructor() { }
    static getInstance() {
        if (!userService.instance) {
            userService.instance = new userService();
        }
        return userService.instance;
    }
    fetchUser(id, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const a = yield new Promise((resolve, reject) => {
                    db_connection_1.db.query(`SELECT * FROM users WHERE user_id=${id}`, (err, result) => {
                        if (err)
                            reject(err);
                        resolve(result);
                    });
                });
                return a;
            }
            catch (error) {
                next(new appError_1.AppError("Invalid Query", 500));
            }
        });
    }
    addUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, email, password, }) {
            password = (0, utils_1.Encrypter)(password, 10);
            return yield new Promise((resolve, reject) => {
                db_connection_1.db.query(`INSERT INTO users (first_name,last_name,email,password_) VALUES ('${first_name}','${last_name}','${email}','${password}')`, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_connection_1.db.query(`DELETE FROM users WHERE user_id=${id}`, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });
    }
    updateUser(_a, id_1) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, email, password }, id) {
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
                password = (0, utils_1.Encrypter)(password, 10);
                sql += ` password_ = '${password}',`;
            }
            sql = sql.slice(0, -1);
            sql += ` WHERE user_id = ${id}`;
            return yield new Promise((resolve, reject) => {
                db_connection_1.db.query(sql, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });
    }
    userReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_connection_1.db.query(`SELECT 
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
`, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });
    }
}
const userServ = userService.getInstance();
exports.default = userServ;
