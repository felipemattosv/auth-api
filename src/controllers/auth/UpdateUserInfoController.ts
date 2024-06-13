import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { ok, forbidden, badRequest, notFound, internalServerError } from "src/utils/returns";
import { getUserEmailFromToken } from "src/utils/getUserEmailFromToken";
import { UpdateUserBody, UpdateUserInfoSchema } from "src/schemas/UpdateUserInfoSchemas";
import { IGetUser } from "src/interfaces/IGetUser";
import { GetUserService } from "src/services/auth/GetUserService";
import { checkIfTokenIsFromAdmin } from "src/utils/checkIfTokenIsFromAdmin";
import { UpdateUserInfoService } from "src/services/auth/UpdateUserInfoService";

const UpdateUserInfoController: APIGatewayProxyHandler = async (event) => {

  const emailFromToken: string = getUserEmailFromToken(event.requestContext);

  let body: UpdateUserBody;

  try {
    body = await UpdateUserInfoSchema.validateAsync(JSON.parse(event.body));
  } catch {
    return badRequest("invalid body");
  }

  const userIsAdmin: boolean = checkIfTokenIsFromAdmin(event.requestContext);

  if (emailFromToken !== body.email && !userIsAdmin) {
    return forbidden("access forbidden");
  }

  const getUserService = new GetUserService();
  const { user, emailExistsOnDatabase }: IGetUser = await getUserService.execute(body.email);

  if (!emailExistsOnDatabase) {
    return notFound("user not found");
  }

  let itemsToChange: string[] = [];
  
  if (body.role && user.role !== body.role) {

    if (!userIsAdmin) {
      return forbidden("access forbidden! only admins can change roles");
    }

    itemsToChange.push("role");
  }

  if (body.name && user.name !== body.name)
    itemsToChange.push("name");

  if (body.password && user.password !== body.password)
    itemsToChange.push("password");

  if (itemsToChange.length === 0) {
    return badRequest("no changes detected");
  }

  const updateUserInfoService = new UpdateUserInfoService();

  const promises = itemsToChange.map((item) => {
    return updateUserInfoService.execute(user.email, item, body[item]);
  })

  try {
    await Promise.all(promises);
  } catch {
    return internalServerError("error updating user info");
  }

  return ok("userInfo", `${itemsToChange} updated successfully`)
};

export const handle = Handler(UpdateUserInfoController);
