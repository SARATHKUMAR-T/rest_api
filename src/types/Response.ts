import { Response } from "express";
import { Send } from "express-serve-static-core";

export interface ConfigResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
