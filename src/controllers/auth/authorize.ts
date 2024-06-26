import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from "aws-lambda/common/api-gateway";
import { UserToken } from "../../entities/User";
import { baseAuthorizer } from "../../utils/permissionVerifier";
import { Role } from "src/enums/Role"

const listUsers = (
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
): UserToken | undefined =>
  baseAuthorizer(
    requestContext,
    [
      Role.ADMIN,
    ]
  );

  const createAccountByAdmin = (
    requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
  ): UserToken | undefined =>
    baseAuthorizer(
      requestContext,
      [
        Role.ADMIN,
      ]
    );

const deleteUser = (
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
): UserToken | undefined =>
   baseAuthorizer(
    requestContext,
    [
      Role.ADMIN,
    ]
  );

const getUserInfo = (
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
): UserToken | undefined =>
   baseAuthorizer(
    requestContext,
    [
      Role.ADMIN,
    ]
 );

export { listUsers, createAccountByAdmin, deleteUser, getUserInfo };
