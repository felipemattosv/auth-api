import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { IGetUser } from "src/interfaces/IGetUser";
import { SendRecoveryCodeBody, SendRecoveryCodeSchema } from "src/schemas/RecoverPasswordSchemas";
import { GetUserService } from "src/services/auth/GetUserService";
import { SaveCodeService } from "src/services/auth/SaveCodeService";
import { SendEmailService } from "src/services/auth/SendEmailService";
import { generateRandomCode } from "src/utils/generateRandomCode";
import { ok, badRequest, internalServerError, notFound  } from "src/utils/returns";

const SendRecoveryCodeController: APIGatewayProxyHandler = async (event) => {

  if (!event.body) {
    return badRequest("missing body");
  }

  let body: SendRecoveryCodeBody;

  try {
    body = await SendRecoveryCodeSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (!emailExistsOnDatabase) {
    return notFound("email not found in database");
  }

  const recoveryCode: string = generateRandomCode(6);

  const saveCodeService = new SaveCodeService();
  const codeSaved: boolean = await saveCodeService.execute(body.email, recoveryCode, "recoveryCodes");

  if (!codeSaved) {
    return internalServerError("failed to save recovery code, try again");
  }

  const mailBody = `<b>Your recovery code: ${recoveryCode}</b>
  <br>
  <p>This code expires in 5 minutes.</p>
  <p>If more than 5 minutes have passed, request a new code to change your password.</p>
  <br>
  <p>Attention: Do not share this code.</p>
  <br>
  <p>Do not respond to this email. This is an automatic email.</p>`;

  const sendEmailService = new SendEmailService();
  const emailSent: boolean = await sendEmailService.execute(body.email, "Your recovery code to change password", mailBody);

  if (!emailSent) {
    return internalServerError("failed to send email, try again");
  }

  return ok("message", "Recovery code sent to email");
};

export const handle = Handler(SendRecoveryCodeController);
