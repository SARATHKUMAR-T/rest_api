"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
require("dotenv/config");
const exceljs_1 = __importDefault(require("exceljs"));
const fs_1 = __importDefault(require("fs"));
const http_status_codes_1 = require("http-status-codes");
const js_base64_1 = require("js-base64");
const path_1 = __importDefault(require("path"));
const db_connection_1 = require("../config/db_connection");
const types_1 = require("../types");
const utils_1 = require("../utils");
class UserService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async fetchUser(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT * FROM users WHERE user_id=${id} AND active=1`);
            if (result.length === 0) {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, "No user Found");
            }
            const token = (0, utils_1.tokenGenerator)({ id: result[0].user_id });
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, result, token);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async addUser(user) {
        try {
            user.password = (0, utils_1.Encrypter)(user.password, 10);
            const [result] = await db_connection_1.db.query(`INSERT INTO users (first_name,last_name,email,password_) VALUES ('${user.first_name}','${user.last_name}','${user.email}','${user.password}')`);
            const token = (0, utils_1.tokenGenerator)({ id: result.insertId });
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "user added successfully", token);
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
    async regexCheck(value) {
        const regexPattern = /\b\w{1,}?[-.]?(\d{3,})*/g;
        const result = regexPattern.test(value);
        return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.ACCEPTED, value, result);
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
    async fileBase64(id, res) {
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
            fs_1.default.readFile(filepath, (err, data) => {
                if (err) {
                    const response = new types_1.APIresponse(true, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, "unable to read file");
                    res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json(response);
                }
                const encoded = js_base64_1.Base64.encode(data.toString());
                const result = new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, encoded);
                res.status(http_status_codes_1.StatusCodes.OK).json(result);
            });
        }
        catch (error) {
            const err = new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(err);
        }
    }
    async reportMail(id, mailTo) {
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
            console.log(filepath);
            (0, utils_1.mailerGenerator)({
                from: "spellbee931@gmail.com",
                to: mailTo,
                subject: `${result[0].user_name}-Report`,
                attachments: [
                    {
                        path: "./src/reports/saravanan S FORD's report.xlsx",
                    },
                ],
            });
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "email send successfully");
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async fileHandler(id, req) {
        try {
            const file = req.file;
            if (file) {
                console.log(req.file, "file");
                const workbook = new exceljs_1.default.Workbook();
                const excel = await workbook.xlsx.readFile(file.path);
                let allValues = [];
                excel.eachSheet(function (worksheet, id) {
                    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                        row.values;
                        if (rowNumber !== 1) {
                            allValues.push(row.values);
                        }
                    });
                });
                const valueArray = allValues.map((item) => {
                    return [item[1], item[2], "2022-01-11"];
                });
                console.log(valueArray);
                const [result] = await db_connection_1.db.query("INSERT INTO transactions (employee_id,amount,payment_date) VALUES ?", [valueArray]);
                if (result.affectedRows > 1) {
                    return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "data uploaded successfully");
                }
                else {
                    return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.CONFLICT, "unable to insert data into databse.please try again");
                }
            }
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
}
exports.userService = UserService.getInstance();
