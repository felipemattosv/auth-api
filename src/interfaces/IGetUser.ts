import { User } from "../entities/User";

export interface IGetUser {
  user: User;
  emailExistsOnDatabase: boolean;
}
