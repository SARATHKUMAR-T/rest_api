"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
// import { userMiddlewareInstance } from "../middlewares/userMiddleware";
class userRoute {
    static instance;
    router = (0, express_1.Router)();
    constructor() {
        this.initiateRoutes();
    }
    static getInstance() {
        if (!userRoute.instance) {
            userRoute.instance = new userRoute();
        }
        return userRoute.instance;
    }
    initiateRoutes() {
        this.router.route("/newuser").post(controllers_1.userInstance.newUser);
        // param middleware
        // this.router.param("id", userMiddlewareInstance.userCheck);
        this.router
            .route("/user/:id")
            .get(controllers_1.userInstance.getUser)
            .patch(controllers_1.userInstance.updateUser)
            .delete(controllers_1.userInstance.deleteUser);
        this.router.route("/employee/:id").patch(controllers_1.userInstance.addEmployee);
        this.router.route("/report/:id").get(controllers_1.userInstance.getReport);
        // this.router.route("/report1/:id").get(userInstance.getBase64);
    }
}
exports.userRouter = userRoute.getInstance();
