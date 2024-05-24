import InternalError from "./InternalError";

/**
 * Raised when one of the arguments provided to a method is not valid.
 */
class ArgumentError extends InternalError {
  constructor(message: string) {
    super(message);

    this.name = "ArgumentError";
  }
}

export default ArgumentError;
