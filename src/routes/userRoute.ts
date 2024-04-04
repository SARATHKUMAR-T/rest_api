import { Router } from "express";
// import { userMiddlewareInstance } from "../middlewares/userMiddleware";
import userInstance from "../controllers/userController";
class userRoutes {
  router = Router();
  constructor() {
    this.initiateRoutes();
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
    this.router.route("/report/:id").get(userInstance.getReport);
    this.router.route("/report1/:id").get(userInstance.getBase64);
  }
}

export default new userRoutes().router;
