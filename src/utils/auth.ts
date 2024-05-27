import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
  APIGatewayTokenAuthorizerHandler,
  Context,
} from "aws-lambda";
import { UserToken } from "../entities/User";
import { tryAuthenticate } from "../utils/authenticator";

const generateAuthenticateResult = (
  principalId: string,
  effect: string,
  resource: string,
  session?: UserToken
): APIGatewayAuthorizerResult => ({
  principalId: principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
  ...(session && {
    context: {
      session: JSON.stringify(session),
    },
  }),
});

export const authenticate: APIGatewayTokenAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent,
  context: Context
) => {
  let session: UserToken | undefined = undefined;
  try {
    session = tryAuthenticate(event.authorizationToken);
  } catch (error) {
    console.error({ event, context, error });
    throw new Error("Unauthorized");
  }
  if (!session) throw new Error("Unauthorized");

  return generateAuthenticateResult(session.email, "Allow", "*", session);
};
