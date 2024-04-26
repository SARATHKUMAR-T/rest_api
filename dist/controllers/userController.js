"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
    async getUser(req, res, next) {
        try {
            const result = await services_1.userService.fetchUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async newUser(req, res, next) {
        try {
            const result = await services_1.userService.addUser(req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const result = await services_1.userService.updateUser(req.body, req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async regex(req, res, next) {
        try {
            const result = await services_1.userService.regexCheck(req.body.value);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const result = await services_1.userService.removeUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getReport(req, res, next) {
        try {
            const result = await services_1.userService.userReport(req.params.id);
            if (result.data)
                return res.status(result.status).download(result.data);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async sendEmployeeReports(req, res, next) {
        try {
            const result = await services_1.userService.reportSender(req.body.employees);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getReportStatus(req, res, next) {
        try {
            const result = await services_1.userService.reportStatus(req.params.id);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async reportMailer(req, res, next) {
        try {
            const result = await services_1.userService.reportMail(req.params.id, req.body.mailTo);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async fileUploader(req, res, next) {
        try {
            const result = await services_1.userService.fileHandler(req.params.id, req);
            if (result) {
                return res.status(result.status).json(result);
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getBase64(req, res, next) {
        try {
            await services_1.userService.fileBase64(req.params.id, res);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userController = UserController.getInstance();
