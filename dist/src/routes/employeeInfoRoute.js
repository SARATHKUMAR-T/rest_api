"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeInfoRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class EmployeeInfoRoute {
    static instance;
    router = (0, express_1.Router)();
    constructor() {
        this.initiateRoutes();
    }
    static getInstance() {
        if (!EmployeeInfoRoute.instance) {
            EmployeeInfoRoute.instance = new EmployeeInfoRoute();
        }
        return EmployeeInfoRoute.instance;
    }
    initiateRoutes() {
        this.router
            .route("/info/:id")
            .post(controllers_1.employeeController.addEmployeeDetails)
            .get(controllers_1.employeeController.getEmployeeDetails)
            .patch(controllers_1.employeeController.updateEmployeeDetails)
            .delete(controllers_1.employeeController.deleteEmployeeDetails);
    }
}
exports.employeeInfoRouter = EmployeeInfoRoute.getInstance();
