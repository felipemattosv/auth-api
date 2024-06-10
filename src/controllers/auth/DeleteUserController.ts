import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, forbidden, internalServerError, badRequest, notFound } from "src/utils/returns";
import * as Authorize from "./authorize";
import { DeleteUserBody, DeleteUserSchema } from "src/schemas/DeleteSchemas";
import { GetUserService } from "src/services/auth/GetUserService";
import { IGetUser } from "src/interfaces/IGetUser";
import { getUserEmailFromToken } from "src/utils/getUserEmailFromToken";
import { DeleteUserService } from "src/services/auth/DeleteUserService";

const DeleteUserController: APIGatewayProxyHandler = async (event) => {

  const emailFromToken: string = getUserEmailFromToken(event.requestContext);

  let body: DeleteUserBody;

  try {
    body = await DeleteUserSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  if (emailFromToken !== body.email && !Authorize.deleteUser(event.requestContext)) {
    return forbidden("unauthorized");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (!emailExistsOnDatabase) {
    return notFound("email not found in database");
  }

  const deleteUserService = new DeleteUserService();
  const userDeleted: boolean = await deleteUserService.execute(body.email);

  if (!userDeleted) {
    return internalServerError("error deleting user");
  }
  
  return ok("message", "User successfully deleted")
};

export const handle = Handler(DeleteUserController);
