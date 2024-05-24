import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "./AppError";

/**
 * Raised when the model is invalid.
 */
class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);

    this.name = "ValidationError";
  }
}

export default ValidationError;
