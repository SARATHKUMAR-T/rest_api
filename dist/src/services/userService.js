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
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../db_connection");
class userService {
    constructor() { }
    static getInstance() {
        if (!userService.instance) {
            userService.instance = new userService();
        }
        return userService.instance;
    }
    fetchUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM users WHERE user_id=${id}`;
            return yield (0, db_connection_1.query)({ sql });
        });
    }
    addUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, email, password, }) {
            const sql = `INSERT INTO users (first_name,last_name,email,password_) VALUES ('${first_name}','${last_name}','${email}','${password}')`;
            return yield (0, db_connection_1.query)({ sql });
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM users WHERE user_id=${id}`;
            return yield (0, db_connection_1.query)({ sql });
        });
    }
    updateUser(_a, id_1) {
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, email, password }, id) {
            console.log("update triggered");
            let sql = `UPDATE users SET`;
            if (first_name) {
                sql += ` first_name = '${first_name}',`;
            }
            if (last_name) {
                sql += ` last_name = '${last_name}',`;
            }
            if (email) {
                sql += ` email = '${email}',`;
            }
            if (password) {
                sql += ` password_ = '${password}',`;
            }
            sql = sql.slice(0, -1);
            sql += ` WHERE user_id = ${id}`;
            return yield (0, db_connection_1.query)({ sql });
        });
    }
}
const userServ = userService.getInstance();
exports.default = userServ;
