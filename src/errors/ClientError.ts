import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "./AppError";

/**
 * Raised under any generic failure, client request fault.
 */
class ClientError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);

    this.name = "ClientError";
  }
}

export default ClientError;
