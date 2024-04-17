"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressControl = void 0;
const addressS1_1 = require("../services/addressS1");
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
            const result = await addressS1_1.AddressServiceS1.getUserAddress(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async addUserAddress(req, res, next) {
        try {
            const result = await addressS1_1.AddressServiceS1.addUserAddress(req.params.id, req.body.address);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserAddress(req, res, next) {
        try {
            const result = await addressS1_1.AddressServiceS1.updateUserAddress(req.params.id, req.body.address);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUserAddress(req, res, next) {
        try {
            const result = await addressS1_1.AddressServiceS1.deleteUserAddress(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.addressControl = addressController.getInstance();
