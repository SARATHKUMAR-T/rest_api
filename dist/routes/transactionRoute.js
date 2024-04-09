"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class TransactionRoute {
    static instance;
    router = (0, express_1.Router)();
    constructor() {
        this.initiateRoutes();
    }
    static getInstance() {
        if (!TransactionRoute.instance) {
            TransactionRoute.instance = new TransactionRoute();
        }
        return TransactionRoute.instance;
    }
    initiateRoutes() {
        this.router
            .route("/transaction/:id")
            .post(controllers_1.transactionControl.addemployeeTransaction)
            .get(controllers_1.transactionControl.getUserTransaction)
            .patch(controllers_1.transactionControl.updateEmployeeTransaction)
            .delete(controllers_1.transactionControl.deleteEmployeeTransaction);
    }
}
exports.transactionRouter = TransactionRoute.getInstance();
