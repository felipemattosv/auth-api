import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "./AppError";

/**
 * Raised when a request cannot be processed because of a conflict with the current state of the resource.
 */
class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.CONFLICT);

    this.name = "ConflictError";
  }
}

export default ConflictError;
