import jwt from "jsonwebtoken";
import { type Response, type NextFunction } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { getUserData } from "../utils/db/user/UserQueries";

// MIDDLEWARE: Check if JWT is valid & user is registered
export const authorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(403).json({ message: "Session expired" });
  try {
    const username = (jwt.verify(token, process.env.JWT_SALT as string) as any)
      .data;

    const user = await getUserData(username);
    if (!user)
      return res
        .status(401)
        .json({ message: "User with this session cannot be found" });
    req.token = token;
    req.username = username;
    return next();
  } catch (err) {
    console.error(err);
  }
};
