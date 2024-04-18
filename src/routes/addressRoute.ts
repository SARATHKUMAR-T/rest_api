import { Router } from "express";
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
    this.router.route("/address/:id");
  }
}

export const addressRouter = AddressRoute.getInstance();
