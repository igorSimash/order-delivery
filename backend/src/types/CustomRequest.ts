import { type Request } from "express";

export interface CustomRequest extends Request {
  username?: string;
  token?: string;
}
