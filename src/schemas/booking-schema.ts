import Joi from 'joi';

export const bookingSchema = Joi.object({
  roomId: Joi.number().positive().integer().allow(0).required(),
});

export const bookingIdSchema = Joi.object({
  bookingId: Joi.number().positive().integer().allow(0).required(),
});
