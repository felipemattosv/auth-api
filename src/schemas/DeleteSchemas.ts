import * as Joi from 'joi';

export const DeleteUserSchema = Joi.object({
  email: Joi.string().email().required(),
});

export type DeleteUserBody = {
  email: string;
};
