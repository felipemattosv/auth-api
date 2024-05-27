import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, badRequest, notFound, unauthorized } from "src/utils/returns";
import { loginSchema } from "src/schemas/LoginSchema";
import { UserLogin, UserToken } from "src/entities/User";
import { IGetUser } from "src/interfaces/IGetUser";
import { GetUserService } from "src/services/auth/GetUserService";
import { generateToken } from "src/utils/generateToken";

const LoginController: APIGatewayProxyHandler = async (event) => {

  if (!event.body) {
    return badRequest("missing body");
  }

  let body: UserLogin;

  try {
    body = await loginSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { user, emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (!emailExistsOnDatabase) {
    return notFound("email not found");
  }

  if (user.password !== body.password) {
    return unauthorized("invalid password");
  }

  const userInfo: UserToken = {
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const token: string = generateToken(userInfo);

  return ok("data", {"token": token, "userInfo": userInfo});
};

export const handle = Handler(LoginController);
