import { StatusCodes } from "http-status-codes";
import { APIresponse } from "../types";
import { redisClient } from "../config";

class RedisService {
  private static instance: RedisService;

  private constructor() {}

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async addUser(userName: string, location: string, salary: Number) {
    try {
      const res = await redisClient.set(
        "key",
        JSON.stringify({ name: userName, location, salary })
      );
      return new APIresponse<null>(
        false,
        StatusCodes.OK,
        "user added successfully"
      );
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
  public async getUser(key: string) {
    try {
      const res = await redisClient.get(key);
      if (res)
        return new APIresponse<string>(
          false,
          StatusCodes.OK,
          "user fetched successfully",
          JSON.parse(res)
        );
      else {
        return new APIresponse<null>(
          true,
          StatusCodes.NOT_FOUND,
          "no user found"
        );
      }
    } catch (error: Error | any) {
      return new APIresponse<null>(
        true,
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
  }
}

export const redisService = RedisService.getInstance();
