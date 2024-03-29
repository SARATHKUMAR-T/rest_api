import userController from "../controllers/userController";
import middlewareController from "../middleware/userMiddleware";
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
    this.router
      .route("/user/:id")
      .get(this.middlewareCtrl.userCheck, this.userCtrl.getUser)
      .patch(this.middlewareCtrl.userCheck, this.userCtrl.updateUser)
      .delete(this.middlewareCtrl.userCheck, this.userCtrl.deleteUser);
  }
}

export default new userRoutes().router;
