import { UserWithoutSensitiveData } from "src/entities/User";

export interface IGetUsers {
  users: UserWithoutSensitiveData[];
  dbAccessStatus: boolean;
}
