import { Router } from "express";
import { userInstance } from "../controllers";
import { userMiddlewareInstance } from "../middlewares/userMiddleware";
import { upload } from "../utils";
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
    this.router
      .route("/user/:id")
      .get(userInstance.getUser)
      .patch(userMiddlewareInstance.authMiddleware, userInstance.updateUser)
      .delete(userInstance.deleteUser);

    this.router.route("/report/:id").get(userInstance.getReport);
    this.router.route("/reportmailer/:id").get(userInstance.reportMailer);
    this.router
      .route("/fileuploader/:id")
      .post(
        userMiddlewareInstance.authMiddleware,
        upload.single("file"),
        userInstance.fileUploader
      );
  }
}

export const userRouter = userRoute.getInstance();
