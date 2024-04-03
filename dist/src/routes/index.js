"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const appError_1 = require("../errorHandler/appError");
const errorHandler_1 = require("../errorHandler/errorHandler");
class Routes {
    constructor(app) {
        // user routes
        app.use("", userRoute_1.default);
        app.all("*", (req, res, next) => {
            next(new appError_1.AppError(`cannot find ${req.originalUrl} on this server`, 404));
        });
        app.use(errorHandler_1.erroHandle.globalErrorHandler);
    }
}
exports.default = Routes;
