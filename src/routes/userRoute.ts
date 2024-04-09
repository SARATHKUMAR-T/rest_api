import { Router } from "express";
import { upload } from "../utils";
import { userMiddleware } from "../middlewares";
import { userController } from "../controllers";
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
    this.router.route("/newuser").post(userController.newUser);
    this.router
      .route("/user/:id")
      .get(userController.getUser)
      .patch(userMiddleware.authMiddleware, userController.updateUser)
      .delete(userMiddleware.authMiddleware, userController.deleteUser);
    this.router.use(userMiddleware.authMiddleware);
    this.router.route("/report/:id").get(userController.getReport);
    this.router.route("/encodedreport/:id").get(userController.getBase64);
    this.router.route("/reportmailer/:id").get(userController.reportMailer);
    this.router
      .route("/fileuploader/:id")
      .post(upload.single("file"), userController.fileUploader);
  }
}

export const userRouter = userRoute.getInstance();
