"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const utils_1 = require("../utils");
const http_status_codes_1 = require("http-status-codes");
require("dotenv/config");
const services_1 = require("../services");
const types_1 = require("../types");
class MiddlewareController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!MiddlewareController.instance) {
            MiddlewareController.instance = new MiddlewareController();
        }
        return MiddlewareController.instance;
    }
    async authMiddleware(req, res, next) {
        try {
            if (req.headers["x-auth-token"]) {
                const token = req.headers["x-auth-token"];
                if (typeof token === "string") {
                    const decoded = (0, utils_1.tokenDecoder)(token);
                    const result = await services_1.userService.fetchUser(decoded.id);
                    if ((result.status = 200))
                        next();
                    else {
                        return res.status(result.status).json(result);
                    }
                }
            }
            else {
                return res
                    .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .json(new types_1.APIresponse(true, http_status_codes_1.StatusCodes.UNAUTHORIZED, "invaild token"));
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userMiddleware = MiddlewareController.getInstance();
