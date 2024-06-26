import { Role } from "src/enums/Role";

type User = {
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: number;
  updatedAt: number;
};

type UserToken = Omit<User, 'password'>

type UserLogin = Pick<User, 'email' | 'password'>

type UserWithoutSensitiveData = Omit<User, 'password'>

export { User, UserToken, UserLogin, UserWithoutSensitiveData };
