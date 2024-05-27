import * as Joi from 'joi';

export const paramsSchema = Joi.object({
  name: Joi.string().required(),
});