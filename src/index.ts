import { Application, json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

export default class Server {
  constructor(app: Application) {
    this.config(app);
  }

  public config(app: Application): void {
    app.use(cors());
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(morgan("combined"));
  }
}
