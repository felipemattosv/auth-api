import { DocumentData } from "firebase/firestore";
import { Code } from "src/entities/Code";
import { IGetCode } from "src/interfaces/IGetCode";
import { getDocumentById } from "src/utils/getDocumentById";

class GetVerificationCodeService {
  async execute(email: string): Promise<IGetCode> {

    const codeData: DocumentData = await getDocumentById('verificationCodes', email);

    if (codeData) {

      const code: Code = {
        email: codeData.email,
        code: codeData.code,
        createdAt: codeData.createdAt,
      };

      return { codeData: code, codeWasFound: true };
    }

    return { codeData: null, codeWasFound: false };
  }
}

export { GetVerificationCodeService };
