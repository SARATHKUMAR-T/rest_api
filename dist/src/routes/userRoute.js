"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { userMiddlewareInstance } from "../middlewares/userMiddleware";
const userController_1 = __importDefault(require("../controllers/userController"));
class userRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initiateRoutes();
    }
    initiateRoutes() {
        this.router.route("/newuser").post(userController_1.default.newUser);
        // param middleware
        // this.router.param("id", userMiddlewareInstance.userCheck);
        this.router
            .route("/user/:id")
            .get(userController_1.default.getUser)
            .patch(userController_1.default.updateUser)
            .delete(userController_1.default.deleteUser);
        this.router.route("/report/:id").get(userController_1.default.getReport);
        this.router.route("/report1/:id").get(userController_1.default.getBase64);
    }
}
exports.default = new userRoutes().router;
