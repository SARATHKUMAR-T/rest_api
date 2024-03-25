import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { db } from "./db_connection";
import { user } from "./models/user";
import { userRouter } from "./routes/userRoute";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

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
app.listen(8000, (): void => {
  console.log("Server is Listening");
});

// Different routes
app.use("", userRouter);
