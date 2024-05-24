import { HttpStatusCode } from "src/enums/HttpStatusCode";
import AppError from "../AppError";

/**
 * Base application server error.
 */
class InternalError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.INTERNAL_ERROR);

    this.name = "InternalError";
  }
}

export default InternalError;
