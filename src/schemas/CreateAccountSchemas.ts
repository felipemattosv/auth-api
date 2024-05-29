import * as Joi from 'joi';

export const VerifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
})

export type VerifyEmailBody = {
  email: string;
}

export const CreateAccountByUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  verificationCode: Joi.string().required(),
})

export type CreateAccountByUserBody = {
  email: string;
  password: string;
  name: string;
  verificationCode: string;
}
