"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class RedisRoute {
    static instance;
    router = (0, express_1.Router)();
    constructor() {
        this.initiateRoutes();
    }
    static getInstance() {
        if (!RedisRoute.instance) {
            RedisRoute.instance = new RedisRoute();
        }
        return RedisRoute.instance;
    }
    initiateRoutes() {
        this.router
            .route("/redisuser")
            .post(controllers_1.redisController.addUser)
            .get(controllers_1.redisController.getUser);
    }
}
exports.redisRouter = RedisRoute.getInstance();
