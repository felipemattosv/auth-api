import * as Joi from 'joi';

export const GetUserSchema = Joi.object({
  email: Joi.string().email().required(),
});

export type GetUserParams = {
  email: string;
};
