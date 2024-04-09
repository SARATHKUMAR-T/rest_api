"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
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
        this.router.route("/newuser").post(controllers_1.userController.newUser);
        this.router
            .route("/user/:id")
            .get(controllers_1.userController.getUser)
            .patch(middlewares_1.userMiddleware.authMiddleware, controllers_1.userController.updateUser)
            .delete(middlewares_1.userMiddleware.authMiddleware, controllers_1.userController.deleteUser);
        this.router.use(middlewares_1.userMiddleware.authMiddleware);
        this.router.route("/report/:id").get(controllers_1.userController.getReport);
        this.router.route("/encodedreport/:id").get(controllers_1.userController.getBase64);
        this.router.route("/reportmailer/:id").get(controllers_1.userController.reportMailer);
        this.router
            .route("/fileuploader/:id")
            .post(utils_1.upload.single("file"), controllers_1.userController.fileUploader);
    }
}
exports.userRouter = userRoute.getInstance();
