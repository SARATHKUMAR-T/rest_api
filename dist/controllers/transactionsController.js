"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionControl = void 0;
const services_1 = require("../services");
class transactionController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!transactionController.instance) {
            transactionController.instance = new transactionController();
        }
        return transactionController.instance;
    }
    async getUserTransaction(req, res, next) {
        try {
            const result = await services_1.transactionService.fetchTransaction(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async addemployeeTransaction(req, res, next) {
        try {
            const result = await services_1.transactionService.addTransaction(req.params.id, req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateEmployeeTransaction(req, res, next) {
        try {
            const result = await services_1.transactionService.updateTransaction(req.params.id, req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteEmployeeTransaction(req, res, next) {
        try {
            const result = await services_1.transactionService.deleteTransaction(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.transactionControl = transactionController.getInstance();
