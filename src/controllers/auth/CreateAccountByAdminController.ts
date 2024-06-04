import { APIGatewayProxyHandler } from "aws-lambda";
import { Role } from "src/enums/Role";
import { Handler } from "src/errors/Handler";
import { IGetUser } from "src/interfaces/IGetUser";
import { CreateAccountByAdminBody, CreateAccountByAdminSchema } from "src/schemas/CreateAccountSchemas";
import { CreateUserService } from "src/services/auth/CreateUserService";
import { GetUserService } from "src/services/auth/GetUserService";
import { ok, badRequest, conflict, internalServerError, forbidden } from "src/utils/returns";
import * as Authorize from "./authorize";

const CreateAccountByAdminController: APIGatewayProxyHandler = async (event) => {

  if (!Authorize.createAccountByAdmin(event.requestContext)) {
    return forbidden("You are not authorized to perform this action");
  }
  
  if (!event.body) {
    return badRequest("missing body");
  }

  let body: CreateAccountByAdminBody;

  try {
    body = await CreateAccountByAdminSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (emailExistsOnDatabase) {
    return conflict("email already used to create account");
  }

  const createUserService = new CreateUserService();
  const userCreated: boolean = await createUserService.execute(body.email, body.name, body.password, body.role as Role);

  if (!userCreated) {
    internalServerError("error creating account, try again");
  }

  return ok("message", "account sucessfully created");
};

export const handle = Handler(CreateAccountByAdminController);
