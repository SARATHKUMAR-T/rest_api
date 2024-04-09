"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecoder = exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function tokenGenerator(val) {
    return jsonwebtoken_1.default.sign({ val }, process.env.SECRET_KEY ? process.env.SECRET_KEY : "SAFGDDD");
}
exports.tokenGenerator = tokenGenerator;
function tokenDecoder(token) {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY ? process.env.SECRET_KEY : "SAFGDDD");
}
exports.tokenDecoder = tokenDecoder;
