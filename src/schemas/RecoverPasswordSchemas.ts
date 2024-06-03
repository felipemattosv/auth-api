import * as Joi from 'joi';

export const SendRecoveryCodeSchema = Joi.object({
  email: Joi.string().email().required()
});

export type SendRecoveryCodeBody = {
  email: string;
};
