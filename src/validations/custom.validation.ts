import Joi from "joi";

export const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

export const phone: Joi.CustomValidator<string> = (value, helpers) => {
  if (!value.match(/^\d{10}$/)) {
    return helpers.error("phone must be 10 digits");
  }
  return value;
};