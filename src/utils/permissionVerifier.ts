import { UserToken } from "../entities/User";
import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from "aws-lambda";
import { Role } from "src/enums/Role";

export const baseAuthorizer = (
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
  roles: Role[],
): UserToken | undefined => {
  if (!requestContext.authorizer) return;

  const session: UserToken = JSON.parse(requestContext.authorizer.session);

  if (roles.includes(session.role))
    return session;
};
