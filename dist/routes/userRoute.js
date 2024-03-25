"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middleware/userMiddleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/newuser", userController_1.newUser);
exports.userRouter
    .route("/user/:id")
    .get(userController_1.user)
    .patch(userMiddleware_1.checkUser, userController_1.updateUser)
    .delete(userMiddleware_1.checkUser, userController_1.deleteUser);
