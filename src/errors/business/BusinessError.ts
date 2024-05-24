import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "../AppError";

/**
 * Base application business logic error. Raised under execution of non-compliant operation.
 */
class BusinessError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT);

    this.name = "BusinessError";
  }
}

export default BusinessError;
