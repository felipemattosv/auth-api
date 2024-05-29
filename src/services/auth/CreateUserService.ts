import { User } from "src/entities/User";
import { Role } from "src/enums/Role";
import { addDocumentToCollection } from "src/utils/addDocumentToCollection";

class CreateUserService {
  async execute(email: string, name: string, password: string, role: Role): Promise<boolean> {
    
    const createTime = new Date().getTime();

    const docInfo: User = {
      email,
      name,
      password,
      role: role,
      createdAt: createTime,
      updatedAt: createTime
    };

    const status: boolean = await addDocumentToCollection('users', email, docInfo);

    return status;
  }
}

export { CreateUserService };
