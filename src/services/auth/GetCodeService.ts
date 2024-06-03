import { DocumentData } from "firebase/firestore";
import { Code } from "src/entities/Code";
import { IGetCode } from "src/interfaces/IGetCode";
import { getDocumentById } from "src/utils/getDocumentById";

class GetCodeService {
  async execute(email: string, collection: string): Promise<IGetCode> {

    const codeData: DocumentData = await getDocumentById(collection, email);

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

export { GetCodeService };
