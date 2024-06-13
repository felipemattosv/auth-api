import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from "aws-lambda/common/api-gateway";
import { UserToken } from "../entities/User";
import { Role } from "src/enums/Role";

export function checkIfTokenIsFromAdmin(
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>
): boolean {

  const session: UserToken = JSON.parse(requestContext.authorizer.session);

  return session.role === (Role.ADMIN as string);
}
