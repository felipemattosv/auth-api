import { DocumentData } from "firebase/firestore";
import { User, UserWithoutSensitiveData } from "src/entities/User";
import { IGetUsers } from "src/interfaces/IGetUsers";
import { listCollection } from "src/utils/listCollection";

class GetUsersService {
  async execute(): Promise<IGetUsers> {
    
    const usersData: DocumentData[] = await listCollection("users");

    if (!usersData) {
      return { users: [], dbAccessStatus: false };
    }

    const users: UserWithoutSensitiveData[] = usersData.map(user => {
      const { password, ...userWithoutPassword } = user as User;
      return userWithoutPassword;
    });

    return { users, dbAccessStatus: true };
  }
}

export { GetUsersService };
