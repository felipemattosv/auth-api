import InternalError from "./InternalError";

/**
 * Raised under an attempt is made to add an object to the repository by using a key that is already being used.
 */
class DuplicateKeyError extends InternalError {
  constructor(message: string) {
    super(message);

    this.name = "DuplicateKeyError";
  }
}

export default DuplicateKeyError;
