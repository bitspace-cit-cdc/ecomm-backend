import Joi from "joi";

const userBody = Joi.object({
	name: Joi.string().min(3).max(10).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
	password: Joi.string().min(6).required(),
	address: Joi.string().required(),
});

const loginBody = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export default {
	userBody,
	loginBody,
};
