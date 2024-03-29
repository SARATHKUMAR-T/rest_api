"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
class Routes {
    constructor(app) {
        // user routes
        app.use("", userRoute_1.default);
        app.all("*", this.unhandledRouter);
    }
    // function for unhandled routes
    unhandledRouter(req, res) {
        res.status(404).json({
            status: "fail",
            message: `cannot find ${req.originalUrl} on this server !`,
        });
    }
}
exports.default = Routes;
