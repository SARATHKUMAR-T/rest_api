"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExcelBook = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
function generateExcelBook(sheetName, headers, data) {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = headers;
    data.forEach((item) => {
        worksheet.addRow(item);
    });
    return workbook;
}
exports.generateExcelBook = generateExcelBook;
