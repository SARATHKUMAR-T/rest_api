"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroHandle = void 0;
class errorHandler {
    constructor() { }
    async globalErrorHandler(err, req, res, next) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
exports.erroHandle = new errorHandler();
