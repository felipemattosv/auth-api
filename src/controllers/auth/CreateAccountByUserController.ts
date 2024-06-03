import { APIGatewayProxyHandler } from "aws-lambda";
import { Role } from "src/enums/Role";
import { Handler } from "src/errors/Handler";
import { IGetCode } from "src/interfaces/IGetCode";
import { IGetUser } from "src/interfaces/IGetUser";
import { CreateAccountByUserBody, CreateAccountByUserSchema } from "src/schemas/CreateAccountSchemas";
import { CreateUserService } from "src/services/auth/CreateUserService";
import { GetUserService } from "src/services/auth/GetUserService";
import { GetCodeService } from "src/services/auth/GetCodeService";
import { ok, badRequest, conflict, notFound, unauthorized, internalServerError } from "src/utils/returns";

const CreateAccountByUserController: APIGatewayProxyHandler = async (event) => {

  if (!event.body) {
    return badRequest("missing body");
  }

  let body: CreateAccountByUserBody;

  try {
    body = await CreateAccountByUserSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (emailExistsOnDatabase) {
    return conflict("email already used to create account");
  }

  const getCodeService = new GetCodeService();
  const { codeWasFound, codeData }: IGetCode = await getCodeService.execute(body.email, "verificationCodes");
  
  if (!codeWasFound) {
    return notFound("Verification code not found");
  }

  if (codeData.code !== body.verificationCode) {
    return unauthorized("invalid verification code");
  }

  if (codeData.createdAt + 360000 < new Date().getTime()) {
    return unauthorized("verification code expired");
  }

  const createUserService = new CreateUserService();
  const userCreated: boolean = await createUserService.execute(body.email, body.name, body.password, Role.DEFAULT);

  if (!userCreated) {
    internalServerError("error creating account, try again");
  }

  return ok("message", "account sucessfully created");
};

export const handle = Handler(CreateAccountByUserController);
