"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = __importDefault(require("exceljs"));
const path = __importStar(require("path"));
const db_connection_1 = require("../db_connection");
const userService_1 = __importDefault(require("../services/userService"));
class userController {
    constructor() { }
    // get user
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                // calling service layer
                const result = yield userService_1.default.fetchUser(id);
                return res.status(200).json({
                    status: "true",
                    message: "user fetched successfully",
                    user: result,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    // adding new user
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { first_name, last_name, email, password } = req.body;
            try {
                const result = yield userService_1.default.addUser({
                    first_name,
                    last_name,
                    email,
                    password,
                });
                console.log(result, "result for adding user");
                return res.status(200).json({
                    status: "true",
                    message: "user added successfully",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    // updating user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const result = yield userService_1.default.updateUser(req.body, id);
                res.status(200).json({
                    status: "true",
                    message: "user updation successfull",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    // deleting user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const result = yield userService_1.default.removeUser(id);
                res.status(200).json({
                    status: "true",
                    message: "User Deleted Successfully",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    // get report
    getReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
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
`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw new Error("Error occurred while deleting user");
                    else {
                        //  creation of excel sheet
                        const workbook = new exceljs_1.default.Workbook();
                        const worksheet = workbook.addWorksheet("employee report");
                        const reportColumns = [
                            { key: "employee_id", header: "Employee Id" },
                            { key: "user_name", header: "Employee Name" },
                            { key: "role_", header: "Role" },
                            { key: "address", header: "Address" },
                            { key: "amount", header: "Salary" },
                            { key: "payment_date", header: "Pay Date" },
                        ];
                        worksheet.columns = reportColumns;
                        result.forEach((item) => {
                            worksheet.addRow(item);
                        });
                        const filepath = path.format({
                            dir: "./src/reports",
                            base: `${result[0].user_name}'s report.xlsx`,
                        });
                        yield workbook.xlsx.writeFile(filepath);
                        return res.status(200).json({
                            message: "Report fetched successfully",
                            file: filepath,
                            result,
                        });
                    }
                }));
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = userController;
