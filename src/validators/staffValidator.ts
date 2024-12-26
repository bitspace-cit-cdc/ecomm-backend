import Joi from "joi";

const staffBody = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  privileage: Joi.number().min(1).max(3).required(),
  token: Joi.optional(),
});

export default {
  staffBody,
};
