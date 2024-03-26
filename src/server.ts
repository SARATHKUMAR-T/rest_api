import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { db } from "./db_connection";
import { user } from "./models/user";
import { userRouter } from "./routes/userRoute";
import Server from "./index";

const app: Application = express();

const server = new Server(app);

// db connection
db.connect((err) => {
  if (err) {
    console.log("error while connecting db");
    console.log(err);
  }
  console.log("Db connected successfully");

  // creating db
  db.query("CREATE DATABASE IF NOT EXISTS usersDB", (err) => {
    if (err) console.log(err, "error while creating db");
    console.log("database created successfully");
  });

  // creating user table
  db.query("USE usersDB", (err): void => {
    if (err) console.log(err, "error while selecting db");
    else {
      console.log("Db selected successfully");
    }
    db.query(user, (err): void => {
      if (err) console.log(err, "unable to create table");
      else {
        console.log("user table creation was successfull");
      }
    });
  });
});

// listening
app
  .listen(8000, (): void => {
    console.log("Server is Listening");
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("server already in use");
    } else {
      console.log("unable to run a server");
      console.log(err);
    }
  });
