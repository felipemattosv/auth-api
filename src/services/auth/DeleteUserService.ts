import { removeDocumentFromCollection } from "src/utils/removeDocumentFromCollection";

class DeleteUserService {
  async execute(email: string): Promise<boolean> {
    
    const status: boolean = await removeDocumentFromCollection('users', email);

    return status;
  }
}

export { DeleteUserService };
