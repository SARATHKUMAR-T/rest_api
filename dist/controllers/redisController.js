"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisController = void 0;
const services_1 = require("../services");
class RedisController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!RedisController.instance) {
            RedisController.instance = new RedisController();
        }
        return RedisController.instance;
    }
    async addUser(req, res, next) {
        try {
            const result = await services_1.redisService.addUser(req.body.userName, req.body.location, req.body.salary * 1);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            const result = await services_1.redisService.getUser(req.body.key);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.redisController = RedisController.getInstance();
