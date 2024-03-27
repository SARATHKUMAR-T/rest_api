"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
const express_1 = require("express");
class userRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userCtrl = new userController_1.default();
        this.middlewareCtrl = new userMiddleware_1.default();
        this.initiateRoutes();
    }
    initiateRoutes() {
        this.router.route("/newuser").post(this.userCtrl.newUser);
        this.router
            .route("/user/:id")
            .get(this.middlewareCtrl.userCheck, this.userCtrl.getUser)
            .patch(this.middlewareCtrl.userCheck, this.userCtrl.updateUser)
            .delete(this.middlewareCtrl.userCheck, this.userCtrl.deleteUser);
    }
}
exports.default = new userRoutes().router;
