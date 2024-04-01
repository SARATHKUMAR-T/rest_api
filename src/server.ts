import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import morgan from "morgan";
import { db } from "./db_connection";
import Routes from "./routes";

class Server {
  private static instance: Server;
  private app: Application = express();
  private PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

  private constructor() {
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
  set portNumber(port: number) {
    this.PORT = port;
  }

  // getter for port number

  get portNumber(): number {
    return this.PORT;
  }

  //   config method
  private config(): void {
    this.app.use(express.static(`${__dirname}/reports`));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("combined"));
  }

  //   routes
  private setUpRoutes(): void {
    new Routes(this.app);
  }

  //   starting the server
  private start() {
    // db connection
    db.connect((err) => {
      if (err) {
        console.log("error while connecting db");
        console.log(err);
      }

      // creating db
      db.query("CREATE DATABASE IF NOT EXISTS usersDB", (err) => {
        if (err) console.log(err, "error while creating db");
      });

      // creating user table
      db.query("USE task1", (err): void => {
        if (err) console.log(err, "error while selecting db");

        db.query(
          "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255) UNIQUE,password VARCHAR(255))",
          (err): void => {
            if (err) console.log(err, "unable to create table");
          }
        );
      });
    });

    this.app
      .listen(this.PORT, (): void => {
        console.log(`Server is listening on ${this.PORT}`);
      })
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.log("server already in use");
        } else {
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
