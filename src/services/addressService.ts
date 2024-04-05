import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db_connection";
import { APIresponse } from "../types";

class AddressServ {
  private static instance: AddressServ;

  private constructor() {}

  public static getInstance(): AddressServ {
    if (!AddressServ.instance) {
      AddressServ.instance = new AddressServ();
    }
    return AddressServ.instance;
  }

  public async getUserAddress(id: string) {
    try {
      const [result] = await db.query<RowDataPacket[]>(
        `SELECT address FROM address WHERE user_id=${id} AND active=1`
      );
      if (result.length === 0) {
        return new APIresponse<null>(
          true,
          StatusCodes.NOT_FOUND,
          "No user Found"
        );
      }
      return new APIresponse<RowDataPacket[]>(
        false,
        StatusCodes.OK,
        ReasonPhrases.OK,
        result
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
  public async addUserAddress(id: string, address: string) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `INSERT INTO address (user_id,address) VALUES (${id},'${address}')`
      );
      return new APIresponse<null>(
        false,
        StatusCodes.OK,
        "address added successfully"
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async deleteUserAddress(id: string) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE  address SET active=0 WHERE user_id=${id}`
      );
      return new APIresponse<null>(false, StatusCodes.OK, ReasonPhrases.OK);
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }

  public async updateUserAddress(id: string, address: string) {
    try {
      const [result] = await db.query<ResultSetHeader>(
        `UPDATE address SET address='${address}' WHERE user_id=${id}`
      );
      return new APIresponse<null>(
        false,
        StatusCodes.OK,
        "address updated successfully"
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
}

export const AddressService = AddressServ.getInstance();
