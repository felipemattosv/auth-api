import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "./AppError";

/**
 * Raised when an unauthorized request is made.
 */
class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED);

    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
