import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { IGetCode } from "src/interfaces/IGetCode";
import { IGetUser } from "src/interfaces/IGetUser";
import { ChangePasswordBody, ChangePasswordSchema } from "src/schemas/RecoverPasswordSchemas";
import { GetCodeService } from "src/services/auth/GetCodeService";
import { GetUserService } from "src/services/auth/GetUserService";
import { UpdateUserInfoService } from "src/services/auth/UpdateUserInfoService";
import { ok, badRequest, notFound, unauthorized, internalServerError  } from "src/utils/returns";

const ChangePasswordController: APIGatewayProxyHandler = async (event) => {

  if (!event.body) {
    return badRequest("missing body");
  }

  let body: ChangePasswordBody;

  try {
    body = await ChangePasswordSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (!emailExistsOnDatabase) {
    return notFound("email not found in database");
  }

  const getCodeService = new GetCodeService();
  const { codeWasFound, codeData }: IGetCode = await getCodeService.execute(body.email, "recoveryCodes");
  
  if (!codeWasFound) {
    return notFound("Verification code not found");
  }

  if (codeData.code !== body.recoveryCode) {
    return unauthorized("invalid verification code");
  }

  if (codeData.createdAt + 360000 < new Date().getTime()) {
    return unauthorized("verification code expired");
  }

  const updateUserInfoService = new UpdateUserInfoService();
  const userUpdated: boolean = await updateUserInfoService.execute(body.email, "password", body.newPassword);

  if (!userUpdated) {
    return internalServerError("could not update user password");
  }

  return ok("message", "Password updated successfully");
};

export const handle = Handler(ChangePasswordController);
