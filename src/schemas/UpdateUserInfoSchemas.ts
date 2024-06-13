import * as Joi from 'joi';
import { Role } from 'src/enums/Role';

export const UpdateUserInfoSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
  password: Joi.string().optional(),
  role: Joi.string().valid(...Object.values(Role)).optional()
});

export type UpdateUserBody = {
  email: string;
  name?: string;
  password?: string;
  role?: string;
};
