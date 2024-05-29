import { addDocumentToCollection } from "src/utils/addDocumentToCollection";

class SaveVerificationCodeService {
  async execute(email: string, verificationCode: string): Promise<boolean> {
    
    const docInfo = {
      email,
      verificationCode,
      createdAt: new Date().getTime(),
    };

    const status: boolean = await addDocumentToCollection('verificationCodes', email, docInfo);

    return status;
  }
}

export { SaveVerificationCodeService };
