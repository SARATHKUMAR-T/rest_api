import { Request, Response } from "express";
import { db } from "../db_connection";
import { RowDataPacket } from "mysql2";

// creating user
export const newUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      (err, result: RowDataPacket[] | any): Response => {
        if (err) {
          return res.status(500).json({ message: "User Already exsists!!!" });
        } else {
          console.log(result, "result");
          return res.status(200).json({
            message: "New user Created Successfully",
            id: result.insertId,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// get user
export const user = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (err, result: RowDataPacket[]): Response | void => {
        if (err) throw new Error("Error occuried while fetching user details");
        else {
          if (result.length === 0) {
            return res.status(200).json({
              message: "No User Found",
            });
          } else {
            return res.status(200).json({
              message: "data retrived successfully",
              user: result,
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
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

    db.query(updateQuery, updateValues, (err): Response => {
      if (err) throw new Error("Error occurred while updating user");
      else {
        return res.status(200).json({ message: "User updated successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    db.query("DELETE FROM users WHERE id=?", [id], (err) => {
      if (err) throw new Error("Error occurred while deleting user");
      else {
        return res.status(200).json({
          message: "User deletion successfull",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
