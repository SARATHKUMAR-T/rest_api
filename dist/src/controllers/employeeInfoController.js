"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const services_1 = require("../services");
class employeeInfoController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!employeeInfoController.instance) {
            employeeInfoController.instance = new employeeInfoController();
        }
        return employeeInfoController.instance;
    }
    async getEmployeeDetails(req, res, next) {
        try {
            const result = await services_1.EmployeeInfoService.fetchEmployeeInfo(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async addEmployeeDetails(req, res, next) {
        try {
            const result = await services_1.EmployeeInfoService.addEmployeeInfo(req.params.id, req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateEmployeeDetails(req, res, next) {
        try {
            const result = await services_1.EmployeeInfoService.updateEmployeeInfo(req.params.id, req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteEmployeeDetails(req, res, next) {
        try {
            const result = await services_1.EmployeeInfoService.removeEmployeeInfo(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.employeeController = employeeInfoController.getInstance();
