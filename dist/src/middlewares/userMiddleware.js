"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewareInstance = void 0;
const utils_1 = require("../utils");
const http_status_codes_1 = require("http-status-codes");
require("dotenv/config");
const services_1 = require("../services");
class middlewareController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!middlewareController.instance) {
            middlewareController.instance = new middlewareController();
        }
        return middlewareController.instance;
    }
    async authMiddleware(req, res, next) {
        try {
            if (req.headers["x-auth-token"]) {
                const token = req.headers["x-auth-token"];
                if (typeof token === "string") {
                    const decoded = (0, utils_1.tokenDecoder)(token, process.env.SECRET_KEY ? process.env.SECRET_KEY : "sfd");
                    const result = await services_1.userService.fetchUser(decoded.id);
                    if ((result.status = 200))
                        next();
                    else {
                        return res.status(result.status).json(result);
                    }
                }
            }
            else {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid token",
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userMiddlewareInstance = middlewareController.getInstance();
