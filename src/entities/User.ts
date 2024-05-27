import { Role } from "src/enums/Role";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: number;
  updatedAt: number;
};

type UserToken = Omit<User, 'id' | 'password'>

export { User, UserToken };
