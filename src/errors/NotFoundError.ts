import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "./AppError";

/**
 * Raised when an required entity is non existent.
 */
class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);

    this.name = "NotFoundError";
  }
}

export default NotFoundError;
