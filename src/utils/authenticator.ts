import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserToken } from "../entities/User";

export const tryAuthenticate = (
  authorization: string | undefined
): UserToken | undefined => {
  if (!authorization) {
    return;
  }

  config();

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return;
  }

  return jwt.decode(token, {
    json: true,
  }) as UserToken;
};
