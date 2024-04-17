import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db_connection";
import { APIresponse } from "../types";
import { AddressServiceAb } from "../abstarctService/abstractAddressService";

class AddressServS1 extends AddressServiceAb {
  private static instance: AddressServS1;

  private constructor() {
    super();
  }

  public static getInstance(): AddressServS1 {
    if (!AddressServS1.instance) {
      AddressServS1.instance = new AddressServS1();
    }
    return AddressServS1.instance;
  }
  public async getUserAddress(
    id: string
  ): Promise<APIresponse<null> | APIresponse<RowDataPacket[]>> {
    try {
      const [result] = await db.query<RowDataPacket[]>(
        `SELECT address FROM address WHERE user_id=${id} AND 1=(SELECT active from users WHERE user_id=${id})`
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

export const AddressServiceS1 = AddressServS1.getInstance();
