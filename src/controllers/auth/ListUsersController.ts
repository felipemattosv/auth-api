import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, forbidden, internalServerError } from "src/utils/returns";
import * as Authorize from "./authorize";
import { IGetUsers } from "src/interfaces/IGetUsers";
import { GetUsersService } from "src/services/auth/GetUsersService";

const ListUsersController: APIGatewayProxyHandler = async (event) => {

  if (!Authorize.listUsers(event.requestContext)) {
    return forbidden("You are not authorized to perform this action");
  }

  const getUsersService = new GetUsersService();
  const { users, dbAccessStatus }: IGetUsers = await getUsersService.execute();

  if (!dbAccessStatus) {
    return internalServerError("Database access error");
  }

  return ok("users", users)
};

export const handle = Handler(ListUsersController);
