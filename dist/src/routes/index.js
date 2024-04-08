"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
const userRoute_1 = require("./userRoute");
const addressRoute_1 = require("./addressRoute");
const transactionRoute_1 = require("./transactionRoute");
const employeeInfoRoute_1 = require("./employeeInfoRoute");
const userMiddleware_1 = require("../middlewares/userMiddleware");
class Routes {
    constructor(app) {
        app.use("", userRoute_1.userRouter.router);
        app.use("", userMiddleware_1.userMiddlewareInstance.authMiddleware, addressRoute_1.addressRouter.router);
        app.use("", userMiddleware_1.userMiddlewareInstance.authMiddleware, transactionRoute_1.transactionRouter.router);
        app.use("", userMiddleware_1.userMiddlewareInstance.authMiddleware, employeeInfoRoute_1.employeeInfoRouter.router);
        app.all("*", (req, res, next) => {
            next(new Error("cannot found this route"));
        });
        app.use(errorHandlerMiddleware_1.erroHandle.globalErrorHandler);
    }
}
exports.default = Routes;
