import { DocumentData } from "firebase/firestore";
import { User } from "src/entities/User";
import { IGetUser } from "src/interfaces/IGetUser";
import { getDocumentById } from "src/utils/getDocumentById";

class GetUserService {
  async execute(email: string): Promise<IGetUser> {
    
    const userData: DocumentData = await getDocumentById('users', email);

    if (userData) {

      const user: User = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        password: userData.password,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };
      
      return { user, emailExistsOnDatabase: true };
    }

    return { user: null, emailExistsOnDatabase: false };
  }
}

export { GetUserService };
