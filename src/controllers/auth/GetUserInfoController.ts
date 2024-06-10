import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, forbidden, badRequest, notFound } from "src/utils/returns";
import * as Authorize from "./authorize";
import { getUserEmailFromToken } from "src/utils/getUserEmailFromToken";
import { GetUserParams, GetUserSchema } from "src/schemas/GetUserSchema";
import { IGetUser } from "src/interfaces/IGetUser";
import { GetUserService } from "src/services/auth/GetUserService";
import { UserWithoutSensitiveData } from "src/entities/User";

const GetUserInfoController: APIGatewayProxyHandler = async (event) => {

  const emailFromToken: string = getUserEmailFromToken(event.requestContext);

  let params: GetUserParams;

  try {
    params = await GetUserSchema.validateAsync(event.queryStringParameters);
  } catch {
    return badRequest("invalid params");
  }

  if (emailFromToken !== params.email && !Authorize.getUserInfo(event.requestContext)) {
    return forbidden("unauthorized");
  }

  const getUserService = new GetUserService();
  const { user, emailExistsOnDatabase }: IGetUser = await getUserService.execute(params.email);

  if (!emailExistsOnDatabase) {
    return notFound("user not found");
  }

  const userWithoutSensitiveData: UserWithoutSensitiveData = {
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return ok("userInfo", userWithoutSensitiveData)
};

export const handle = Handler(GetUserInfoController);
