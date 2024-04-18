"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
class Server {
    static instance;
    app = (0, express_1.default)();
    PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
    constructor() {
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
    async start() {
        // db connection
        await config_1.redisClient.connect();
        config_1.redisClient.on("error", (error) => {
            console.log("redis client error", error);
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
