import { type Response, type Request } from "express";
import { getUserData } from "../../utils/db/user/UserQueries";
import bcrypt from "bcrypt";
import { createJWT } from "../../utils/general/createJWT";

// Login user + give JWT as response
export const signInController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await getUserData(username);
    if (!user) return res.status(401).json({ message: "User is not found" });

    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid password" });

    const token = createJWT(username, "7d");
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
