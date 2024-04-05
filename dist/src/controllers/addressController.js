"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressControl = void 0;
const services_1 = require("../services");
class addressController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!addressController.instance) {
            addressController.instance = new addressController();
        }
        return addressController.instance;
    }
    async getUserAddress(req, res, next) {
        try {
            const result = await services_1.AddressService.getUserAddress(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async addUserAddress(req, res, next) {
        try {
            const result = await services_1.AddressService.addUserAddress(req.params.id, req.body.address);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserAddress(req, res, next) {
        try {
            const result = await services_1.AddressService.updateUserAddress(req.params.id, req.body.address);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUserAddress(req, res, next) {
        try {
            const result = await services_1.AddressService.deleteUserAddress(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.addressControl = addressController.getInstance();
