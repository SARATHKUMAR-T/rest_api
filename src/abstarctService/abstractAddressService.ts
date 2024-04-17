import { RowDataPacket } from "mysql2";
import { APIresponse } from "../types";

export abstract class AddressServiceAb {
  constructor() {}
  abstract getUserAddress(
    id: string
  ): Promise<APIresponse<null> | APIresponse<RowDataPacket[]>>;
  abstract addUserAddress(
    id: string,
    address: string
  ): Promise<APIresponse<null>>;
  abstract deleteUserAddress(id: string): Promise<APIresponse<null>>;
  abstract updateUserAddress(
    id: string,
    address: string
  ): Promise<APIresponse<null>>;
}
