import { type Response, type Request } from "express";
import { addUser, getUserData } from "../../utils/db/user/UserQueries";
import bcrypt from "bcrypt";
import { createJWT } from "../../utils/general/createJWT";

// Add user to the DB + give JWT as response
export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await getUserData(username);
    if (user) return res.status(409).json({ message: "User already exists" });

    const password_hash = bcrypt.hashSync(password, 10);
    await addUser(username, password_hash);

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
