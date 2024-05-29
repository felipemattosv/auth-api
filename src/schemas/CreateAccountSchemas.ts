import * as Joi from 'joi';

export const VerifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
})

export type VerifyEmailBody = {
  email: string;
}
