import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { HelloService } from "src/services/base/HelloService";
import { ok } from "src/utils/returns";

const HelloWorldController: APIGatewayProxyHandler = async () => {

  const helloService = new HelloService();
  const message: string = await helloService.execute();

  return ok("message", message);
};

export const handle = Handler(HelloWorldController);
