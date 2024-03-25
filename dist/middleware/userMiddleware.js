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
exports.checkUser = void 0;
const db_connection_1 = require("../db_connection");
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        db_connection_1.db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
            if (err)
                throw new Error("Error occuried while fetching user details");
            else {
                if (result.length === 0) {
                    return res.status(200).json({
                        message: "No User Found Unable To Proceed Further Actions.",
                    });
                }
                else {
                    next();
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});
exports.checkUser = checkUser;
