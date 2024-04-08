"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInstance = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const http_status_codes_1 = require("http-status-codes");
class userController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!userController.instance) {
            userController.instance = new userController();
        }
        return userController.instance;
    }
    async getUser(req, res, next) {
        try {
            const result = await userService_1.default.fetchUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async newUser(req, res, next) {
        try {
            const result = await userService_1.default.addUser(req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const result = await userService_1.default.updateUser(req.body, req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const result = await userService_1.default.removeUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getReport(req, res, next) {
        try {
            const result = await userService_1.default.userReport(req.params.id);
            if (result.data)
                return res.status(result.status).download(result.data);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async reportMailer(req, res, next) {
        try {
            const result = await userService_1.default.reportMail(req.params.id, req.body.mailTo);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fileUploader(req, res, next) {
        try {
            console.log("req received");
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "file uploaded successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userInstance = userController.getInstance();
