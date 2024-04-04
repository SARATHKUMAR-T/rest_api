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
const fs_1 = __importDefault(require("fs"));
const js_base64_1 = require("js-base64");
const path = __importStar(require("path"));
const appError_1 = require("../errorHandler/appError");
const userService_1 = __importDefault(require("../services/userService"));
const utils_1 = require("../utils");
class userController {
    constructor() { }
    static getInstance() {
        if (!userController.instance) {
            userController.instance = new userController();
        }
        return userController.instance;
    }
    // get user
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const a1 = yield userService_1.default.fetchUser(id, next);
                const response = {
                    isError: false,
                    message: "user fetched successfully",
                    data: a1,
                };
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error, "from controller side");
            }
        });
    }
    // adding new user
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { first_name, last_name, email, password } = req.body;
            try {
                yield userService_1.default
                    .addUser({
                    first_name,
                    last_name,
                    email,
                    password,
                })
                    .then((val) => {
                    return res.status(200).json({
                        status: "true",
                        message: "user added successfully",
                        user_id: val.insertId,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    // updating user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield userService_1.default.updateUser(req.body, id).then((val) => {
                    res.status(200).json({
                        status: "true",
                        message: "user updation successfull",
                        value: val.affectedRows,
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    // deleting user
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield userService_1.default.removeUser(id).then((val) => {
                    res.status(200).json({
                        status: "true",
                        message: "User Deleted Successfully",
                        value: val.affectedRows,
                    });
                });
            }
            catch (error) {
                next(new appError_1.AppError(error.message, 404));
            }
        });
    }
    // get report
    getReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const result = yield userService_1.default.userReport(id);
                const workbook = (0, utils_1.generateExcelBook)("employee report", [
                    { key: "employee_id", header: "Employee Id" },
                    { key: "user_name", header: "Employee Name" },
                    { key: "role_", header: "Role" },
                    { key: "address", header: "Address" },
                    { key: "amount", header: "Salary" },
                    { key: "payment_date", header: "Pay Date" },
                ], result);
                const filepath = path.format({
                    dir: "./src/reports",
                    base: `${result[0].user_name}'s report.xlsx`,
                });
                // workbook.xlsx.write(res);
                // const rs = res.status(200);
                yield workbook.xlsx.writeFile(filepath);
                return res.status(200).download(filepath, (err) => {
                    console.log(err);
                    console.log("file not downloaded");
                });
            }
            catch (error) {
                console.log(error, "error while fetching report");
            }
        });
    }
    // get report base64
    getBase64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const result = yield userService_1.default.userReport(id);
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
                fs_1.default.readFile(filepath, (err, data) => {
                    if (err) {
                        return res.status(500).json({ message: "unable to fetch report" });
                    }
                    const encoded = js_base64_1.Base64.encode(data.toString());
                    return res.status(200).json({
                        File: encoded,
                        message: "Report fetched successfully",
                    });
                });
            }
            catch (error) {
                console.log(error, "error while fetching report");
            }
        });
    }
}
const userInstance = userController.getInstance();
exports.default = userInstance;
