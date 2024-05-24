import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    Context,
    Callback,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import {
    noContent,
    internalServerError,
    appError,
    alreadyExists,
    errorMessage,
  } from "../utils/returns";
  import AppError from "./AppError";
  import DuplicateKeyError from "./internal/DuplicateKeyError";
import { HttpStatusCode } from "src/enums/HttpStatusCode";
  
  export const Handler = (handler: APIGatewayProxyHandler) => {
    return async (
      event: APIGatewayProxyEvent,
      context: Context,
      callback: Callback
    ): Promise<APIGatewayProxyResult> => {
      try {
        const response = (await handler(event, context, callback)) || noContent();
  
        return response;
      } catch (err) {
        console.error({
          event,
          context,
          error: typeof err === "function" ? err.toString() : err,
        });
  
        if (err instanceof AppError) {
          if (err instanceof DuplicateKeyError) return alreadyExists(err.message);
  
          return appError(err);
        }
  
        /*
        if (event.requestContext.stage === "dev")
          return errorMessage(
            {
              event,
              context,
              error:
                typeof err === "function"
                  ? err.toString()
                  : err instanceof Error
                  ? err.stack
                  : JSON.stringify(err),
            },
            "content",
            HttpStatusCode.INTERNAL_ERROR
          );
        */
  
        return internalServerError();
      }
    };
  };
  