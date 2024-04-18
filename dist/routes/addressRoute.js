"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
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
        this.router.route("/address/:id");
    }
}
exports.addressRouter = AddressRoute.getInstance();
