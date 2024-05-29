import { Code } from "../entities/Code";

export interface IGetCode {
  codeData: Code;
  codeWasFound: boolean;
}
