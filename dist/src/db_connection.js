"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const util_1 = __importDefault(require("util"));
exports.db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
});
exports.query = util_1.default.promisify(exports.db.query).bind(exports.db);
