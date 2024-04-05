import { Router } from "express";
import { addressControl } from "../controllers";
class AddressRoute {
  private static instance: AddressRoute;
  router = Router();
  private constructor() {
    this.initiateRoutes();
  }

  public static getInstance(): AddressRoute {
    if (!AddressRoute.instance) {
      AddressRoute.instance = new AddressRoute();
    }
    return AddressRoute.instance;
  }
  initiateRoutes() {
    this.router
      .route("/address/:id")
      .post(addressControl.addUserAddress)
      .get(addressControl.getUserAddress)
      .patch(addressControl.updateUserAddress)
      .delete(addressControl.deleteUserAddress);
  }
}

export const addressRouter = AddressRoute.getInstance();
