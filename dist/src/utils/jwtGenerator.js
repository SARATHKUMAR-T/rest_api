"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecoder = exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function tokenGenerator(val, secretKey) {
    return jsonwebtoken_1.default.sign({ val }, secretKey);
}
exports.tokenGenerator = tokenGenerator;
function tokenDecoder(token, secretKey) {
    return jsonwebtoken_1.default.verify(token, secretKey);
}
exports.tokenDecoder = tokenDecoder;
