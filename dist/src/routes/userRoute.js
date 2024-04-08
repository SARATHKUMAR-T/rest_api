"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const utils_1 = require("../utils");
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
        this.router
            .route("/user/:id")
            .get(controllers_1.userInstance.getUser)
            .patch(userMiddleware_1.userMiddlewareInstance.authMiddleware, controllers_1.userInstance.updateUser)
            .delete(controllers_1.userInstance.deleteUser);
        this.router.route("/report/:id").get(controllers_1.userInstance.getReport);
        this.router.route("/reportmailer/:id").get(controllers_1.userInstance.reportMailer);
        this.router
            .route("/fileuploader/:id")
            .post(utils_1.upload.single("file"), controllers_1.userInstance.fileUploader);
    }
}
exports.userRouter = userRoute.getInstance();
