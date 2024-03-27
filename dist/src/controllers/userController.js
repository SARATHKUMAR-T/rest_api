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
class userController {
    constructor() { }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                db_connection_1.db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
                    if (err)
                        throw new Error("Error occuried while fetching user details");
                    else {
                        if (result.length === 0) {
                            return res.status(200).json({
                                message: "No User Found",
                            });
                        }
                        else {
                            return res.status(200).json({
                                message: "data retrived successfully",
                                user: result,
                            });
                        }
                    }
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                db_connection_1.db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "User Already exsists!!!" });
                    }
                    else {
                        console.log(result, "result");
                        return res.status(200).json({
                            message: "New user Created Successfully",
                            id: result.insertId,
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { username, email, password } = req.body;
            try {
                let updateQuery = "UPDATE users SET";
                const updateValues = [];
                if (username) {
                    updateQuery += " username = ?,";
                    updateValues.push(username);
                }
                if (email) {
                    updateQuery += " email = ?,";
                    updateValues.push(email);
                }
                if (password) {
                    updateQuery += " password = ?,";
                    updateValues.push(password);
                }
                updateQuery = updateQuery.slice(0, -1);
                updateQuery += " WHERE id = ?";
                updateValues.push(id);
                db_connection_1.db.query(updateQuery, updateValues, (err) => {
                    if (err)
                        throw new Error("Error occurred while updating user");
                    else {
                        return res.status(200).json({ message: "User updated successfully" });
                    }
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                db_connection_1.db.query("DELETE FROM users WHERE id=?", [id], (err) => {
                    if (err)
                        throw new Error("Error occurred while deleting user");
                    else {
                        return res.status(200).json({
                            message: "User deletion successfull",
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
exports.default = userController;
