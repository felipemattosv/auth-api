import { Code } from "src/entities/Code";
import { addDocumentToCollection } from "src/utils/addDocumentToCollection";

class SaveCodeService {
  async execute(email: string, code: string, collection: string): Promise<boolean> {
    
    const docInfo: Code = {
      email,
      code,
      createdAt: new Date().getTime(),
    };

    const status: boolean = await addDocumentToCollection(collection, email, docInfo);

    return status;
  }
}

export { SaveCodeService };
