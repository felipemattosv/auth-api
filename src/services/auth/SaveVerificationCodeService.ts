import { Code } from "src/entities/Code";
import { addDocumentToCollection } from "src/utils/addDocumentToCollection";

class SaveVerificationCodeService {
  async execute(email: string, verificationCode: string): Promise<boolean> {
    
    const docInfo: Code = {
      email,
      code: verificationCode,
      createdAt: new Date().getTime(),
    };

    const status: boolean = await addDocumentToCollection('verificationCodes', email, docInfo);

    return status;
  }
}

export { SaveVerificationCodeService };
