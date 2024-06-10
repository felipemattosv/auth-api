import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from "aws-lambda/common/api-gateway";
import { UserToken } from "../entities/User";

export function getUserEmailFromToken(
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>
): string {

  const session: UserToken = JSON.parse(requestContext.authorizer.session);

  return session.email;
}
