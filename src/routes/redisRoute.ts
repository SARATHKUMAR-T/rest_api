import { Router } from "express";
import { redisController } from "../controllers";
class RedisRoute {
  private static instance: RedisRoute;
  router = Router();
  private constructor() {
    this.initiateRoutes();
  }

  public static getInstance(): RedisRoute {
    if (!RedisRoute.instance) {
      RedisRoute.instance = new RedisRoute();
    }
    return RedisRoute.instance;
  }
  initiateRoutes() {
    this.router
      .route("/redisuser")
      .post(redisController.addUser)
      .get(redisController.getUser);
  }
}

export const redisRouter = RedisRoute.getInstance();
