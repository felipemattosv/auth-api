import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { HelloService } from "src/services/base/HelloService";
import { ok, badRequest } from "src/utils/returns";
import { paramsSchema } from "src/schemas/BaseSchemas";

const HelloNameController: APIGatewayProxyHandler = async (event) => {

  if (!event.queryStringParameters) {
    return badRequest("Missing query string parameters");
  }

  type Params = { name: string };
  let params: Params;

  try {
    params = await paramsSchema.validateAsync(event.queryStringParameters);
  } catch {
    return badRequest("Invalid query string parameters");
  }

  const helloService = new HelloService();
  const message: string = await helloService.execute(params.name);

  return ok("message", message);
};

export const handle = Handler(HelloNameController);
