"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const errorHandler_1 = __importDefault(require("../errorHandler/errorHandler"));
class Routes {
    constructor(app) {
        this.erroHandler = new errorHandler_1.default();
        // user routes
        app.use("", userRoute_1.default);
        app.all("*", (req, res, next) => {
            const err = new Error(`cannot find ${req.originalUrl} on this server`);
            err.status = "fail";
            err.statusCode = 404;
        });
    }
}
exports.default = Routes;
