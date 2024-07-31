import { CustomRequest } from "../../types/CustomRequest";
import { type Response } from "express";
import { getUserData } from "../../utils/db/user/UserQueries";

// Get user data
export const getUserDataController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const data = await getUserData(req.username as string);
    const { password_hash, ...userData } = data!;
    return res.status(201).json({ data: userData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
