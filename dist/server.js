"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_connection_1 = require("./db_connection");
const user_1 = require("./models/user");
const index_1 = __importDefault(require("./index"));
const app = (0, express_1.default)();
const server = new index_1.default(app);
// db connection
db_connection_1.db.connect((err) => {
    if (err) {
        console.log("error while connecting db");
        console.log(err);
    }
    console.log("Db connected successfully");
    // creating db
    db_connection_1.db.query("CREATE DATABASE IF NOT EXISTS usersDB", (err) => {
        if (err)
            console.log(err, "error while creating db");
        console.log("database created successfully");
    });
    // creating user table
    db_connection_1.db.query("USE usersDB", (err) => {
        if (err)
            console.log(err, "error while selecting db");
        else {
            console.log("Db selected successfully");
        }
        db_connection_1.db.query(user_1.user, (err) => {
            if (err)
                console.log(err, "unable to create table");
            else {
                console.log("user table creation was successfull");
            }
        });
    });
});
// listening
app
    .listen(8000, () => {
    console.log("Server is Listening");
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("server already in use");
    }
    else {
        console.log("unable to run a server");
        console.log(err);
    }
});
