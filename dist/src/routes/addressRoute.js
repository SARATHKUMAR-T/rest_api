"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class AddressRoute {
    static instance;
    router = (0, express_1.Router)();
    constructor() {
        this.initiateRoutes();
    }
    static getInstance() {
        if (!AddressRoute.instance) {
            AddressRoute.instance = new AddressRoute();
        }
        return AddressRoute.instance;
    }
    initiateRoutes() {
        this.router
            .route("/address/:id")
            .post(controllers_1.addressControl.addUserAddress)
            .get(controllers_1.addressControl.getUserAddress)
            .patch(controllers_1.addressControl.updateUserAddress)
            .delete(controllers_1.addressControl.deleteUserAddress);
    }
}
exports.addressRouter = AddressRoute.getInstance();
