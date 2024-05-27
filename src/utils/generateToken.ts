import * as jwt from "jsonwebtoken";
import { UserToken } from "../entities/User";

export function generateToken(userInfo: UserToken): string {
  const token = jwt.sign(
    userInfo,
    process.env.JWT_SECRET_KEY as jwt.Secret,
    {
      algorithm: "HS256",
      expiresIn: "8h",
    },
    
  );

  return token;
}
