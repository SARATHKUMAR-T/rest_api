"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const path_1 = __importDefault(require("path"));
const db_connection_1 = require("../config/db_connection");
const types_1 = require("../types");
const utils_1 = require("../utils");
class userService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!userService.instance) {
            userService.instance = new userService();
        }
        return userService.instance;
    }
    async fetchUser(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT * FROM users WHERE user_id=${id} AND active=1`);
            if (result.length === 0) {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, "No user Found");
            }
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, result);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async addUser(user) {
        try {
            user.password = (0, utils_1.Encrypter)(user.password, 10);
            const [result] = await db_connection_1.db.query(`INSERT INTO users (first_name,last_name,email,password_) VALUES ('${user.first_name}','${user.last_name}','${user.email}','${user.password}')`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "user added successfully", result.insertId);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async removeUser(id) {
        try {
            const [result] = await db_connection_1.db.query(`UPDATE users SET active=0 WHERE user_id=${id}`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async updateUser({ first_name, last_name, email, password }, id) {
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
                password = (0, utils_1.Encrypter)(password, 10);
                sql += ` password_ = '${password}',`;
            }
            sql = sql.slice(0, -1);
            sql += ` WHERE user_id = ${id}`;
            const [result] = await db_connection_1.db.query(sql);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async userReport(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT 
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
            const workbook = (0, utils_1.generateExcelBook)("employee report", [
                { key: "employee_id", header: "Employee Id" },
                { key: "user_name", header: "Employee Name" },
                { key: "role_", header: "Role" },
                { key: "address", header: "Address" },
                { key: "amount", header: "Salary" },
                { key: "payment_date", header: "Pay Date" },
            ], result);
            const filepath = path_1.default.format({
                dir: "./src/reports",
                base: `${result[0].user_name}'s report.xlsx`,
            });
            await workbook.xlsx.writeFile(filepath);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, filepath);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
}
const userServ = userService.getInstance();
exports.default = userServ;
