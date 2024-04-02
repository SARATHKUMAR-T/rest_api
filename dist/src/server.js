"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_connection_1 = require("./config/db_connection");
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
        this.config();
        this.setUpRoutes();
        this.start();
    }
    static getInstance() {
        if (!this.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }
    // setter function for port number
    set portNumber(port) {
        this.PORT = port;
    }
    // getter for port number
    get portNumber() {
        return this.PORT;
    }
    //   config method
    config() {
        this.app.use(express_1.default.static(`${__dirname}/reports`));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("combined"));
    }
    //   routes
    setUpRoutes() {
        new routes_1.default(this.app);
    }
    //   starting the server
    start() {
        // db connection
        db_connection_1.db.connect((err) => {
            if (err) {
                console.log("error while connecting db");
                console.log(err);
            }
            // creating db
            db_connection_1.db.query("CREATE DATABASE IF NOT EXISTS usersDB", (err) => {
                if (err)
                    console.log(err, "error while creating db");
            });
            // creating user table
            db_connection_1.db.query("USE task1", (err) => {
                if (err)
                    console.log(err, "error while selecting db");
                db_connection_1.db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255) UNIQUE,password VARCHAR(255))", (err) => {
                    if (err)
                        console.log(err, "unable to create table");
                });
            });
        });
        this.app
            .listen(this.PORT, () => {
            console.log(`Server is listening on ${this.PORT}`);
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
    }
}
const nodeServer = Server.getInstance();
// configuring the port number
nodeServer.portNumber = process.env.PORT
    ? parseInt(process.env.PORT)
    : nodeServer.portNumber;
