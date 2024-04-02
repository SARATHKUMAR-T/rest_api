"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlewareInstance = void 0;
const userService_1 = __importDefault(require("../services/userService"));
class middlewareController {
    constructor() { }
    static getInstance() {
        if (!middlewareController.instance) {
            middlewareController.instance = new middlewareController();
        }
        return middlewareController.instance;
    }
    userCheck(req, res, next, val) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService_1.default.fetchUser(val.toString()).then((val) => {
                    if (val.length > 0) {
                        next();
                    }
                    else {
                        return res.status(200).json({
                            message: "No User Found Unable To Proceed Further Actions.",
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
}
exports.userMiddlewareInstance = middlewareController.getInstance();