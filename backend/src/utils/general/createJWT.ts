import jwt from "jsonwebtoken";

export const createJWT = (data: any, expiresIn?: string | number) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ data, iat: timestamp }, process.env.JWT_SALT as string, {
    expiresIn,
  });
};
