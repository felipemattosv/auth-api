import * as Joi from 'joi';

export const SendRecoveryCodeSchema = Joi.object({
  email: Joi.string().email().required()
});

export type SendRecoveryCodeBody = {
  email: string;
};

export const ChangePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  recoveryCode: Joi.string().length(6).required(),
  newPassword: Joi.string().required()
});

export type ChangePasswordBody = {
  email: string;
  recoveryCode: string;
  newPassword: string;
};
