"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
const employeeInfoRoute_1 = require("./employeeInfoRoute");
const redisRoute_1 = require("./redisRoute");
const transactionRoute_1 = require("./transactionRoute");
const userRoute_1 = require("./userRoute");
const middlewares_1 = require("../middlewares");
class Routes {
    constructor(app) {
        app.use("", redisRoute_1.redisRouter.router);
        app.use("", userRoute_1.userRouter.router);
        app.use(middlewares_1.userMiddleware.authMiddleware);
        app.use("", transactionRoute_1.transactionRouter.router);
        app.use("", employeeInfoRoute_1.employeeInfoRouter.router);
        app.all("*", (req, res, next) => {
            next(new Error("cannot found this route"));
        });
        app.use(errorHandlerMiddleware_1.erroHandler.globalErrorHandler);
    }
}
exports.default = Routes;
