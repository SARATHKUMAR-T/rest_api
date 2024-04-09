"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function Encrypter(value, saltValue) {
    return bcrypt_1.default.hashSync(value, saltValue);
}
exports.Encrypter = Encrypter;
