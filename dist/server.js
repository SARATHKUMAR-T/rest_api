"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const db_connection_1 = require("./db_connection");
const user_1 = require("./models/user");
const userRoute_1 = require("./routes/userRoute");
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
app.listen(process.env.PORT, () => {
    console.log("Server is Listening");
});
// Different routes
app.use("", userRoute_1.userRouter);
