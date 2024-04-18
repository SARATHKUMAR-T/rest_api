"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisService = void 0;
const http_status_codes_1 = require("http-status-codes");
const types_1 = require("../types");
const config_1 = require("../config");
class RedisService {
    static instance;
    constructor() { }
    static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }
    async addUser(userName, location, salary) {
        try {
            const res = await config_1.redisClient.set("key", JSON.stringify({ name: userName, location, salary }));
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "user added successfully");
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async getUser(key) {
        try {
            const res = await config_1.redisClient.get(key);
            if (res)
                return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "user fetched successfully", JSON.parse(res));
            else {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, "no user found");
            }
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
}
exports.redisService = RedisService.getInstance();
