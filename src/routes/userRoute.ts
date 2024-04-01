import userController from "../controllers/userController";
import middlewareController from "../middlewares/userMiddleware";
import { Router } from "express";

class userRoutes {
  router = Router();
  userCtrl = new userController();
  middlewareCtrl = new middlewareController();
  constructor() {
    this.initiateRoutes();
  }
  initiateRoutes() {
    this.router.route("/newuser").post(this.userCtrl.newUser);
    // param middleware
    this.router.param("id", this.middlewareCtrl.userCheck);
    this.router
      .route("/user/:id")
      .get(this.userCtrl.getUser)
      .patch(this.userCtrl.updateUser)
      .delete(this.userCtrl.deleteUser);

    this.router.route("/report/:id").get(this.userCtrl.getReport);
  }
}

export default new userRoutes().router;
