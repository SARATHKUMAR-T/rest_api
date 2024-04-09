"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
class ErrorHandler {
    constructor() { }
    async globalErrorHandler(err, req, res, next) {
        if (err.message == "invalid file format") {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "unsupported file format,please upload excelsheet only",
            });
        }
        return res.status(500).json({
            message: err.message,
        });
    }
}
exports.erroHandler = new ErrorHandler();
