"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroHandle = void 0;
class errorHandler {
    constructor() { }
    async globalErrorHandler(err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
}
exports.erroHandle = new errorHandler();
