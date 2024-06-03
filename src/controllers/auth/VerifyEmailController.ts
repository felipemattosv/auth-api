import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, badRequest, internalServerError, conflict  } from "src/utils/returns";
import { VerifyEmailSchema, VerifyEmailBody } from "src/schemas/CreateAccountSchemas";
import { generateRandomCode } from "src/utils/generateRandomCode";
import { SendEmailService } from "src/services/auth/SendEmailService";
import { SaveCodeService } from "src/services/auth/SaveCodeService";
import { GetUserService } from "src/services/auth/GetUserService";
import { IGetUser } from "src/interfaces/IGetUser";

const VerifyEmailController: APIGatewayProxyHandler = async (event) => {

  if (!event.body) {
    return badRequest("missing body");
  }

  let body: VerifyEmailBody;

  try {
    body = await VerifyEmailSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const getUserService = new GetUserService();
  const { emailExistsOnDatabase } : IGetUser = await getUserService.execute(body.email);

  if (emailExistsOnDatabase) {
    return conflict("email already used to create account");
  }

  const verificationCode: string = generateRandomCode(6);

  const saveCodeService = new SaveCodeService();
  const codeSaved: boolean = await saveCodeService.execute(body.email, verificationCode, "verificationCodes");

  if (!codeSaved) {
    return internalServerError("failed to save verification code, try again");
  }

  const mailBody = `<b>Your verification code: ${verificationCode}</b>
  <br>
  <p>This code expires in 5 minutes.</p>
  <p>If more than 5 minutes have passed, request a new code to verify the email.</p>
  <br>
  <p>Attention: Do not share this code.</p>
  <br>
  <p>Do not respond to this email. This is an automatic email.</p>`;

  const sendEmailService = new SendEmailService();
  const emailSent: boolean = await sendEmailService.execute(body.email, "Your verification code to create account", mailBody);

  if (!emailSent) {
    return internalServerError("failed to send email, try again");
  }

  return ok("message", "Verification code sent to email");
};

export const handle = Handler(VerifyEmailController);
