import { Router } from "express";
import { userInstance } from "../controllers";
// import { userMiddlewareInstance } from "../middlewares/userMiddleware";
class userRoute {
  private static instance: userRoute;
  router = Router();
  private constructor() {
    this.initiateRoutes();
  }

  public static getInstance(): userRoute {
    if (!userRoute.instance) {
      userRoute.instance = new userRoute();
    }
    return userRoute.instance;
  }
  initiateRoutes() {
    this.router.route("/newuser").post(userInstance.newUser);
    // param middleware
    // this.router.param("id", userMiddlewareInstance.userCheck);
    this.router
      .route("/user/:id")
      .get(userInstance.getUser)
      .patch(userInstance.updateUser)
      .delete(userInstance.deleteUser);

    this.router.route("/employee/:id").patch(userInstance.addEmployee);
    this.router.route("/report/:id").get(userInstance.getReport);
    // this.router.route("/report1/:id").get(userInstance.getBase64);
  }
}

export const userRouter = userRoute.getInstance();
