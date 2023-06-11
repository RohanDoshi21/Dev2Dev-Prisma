import Joi from "joi";

export const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error("any.invalid", {
      code: "PASSWORD_LENGTH",
      message: "Password must be at least 8 characters",
    });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error("any.invalid", {
      code: "PASSWORD_FORMAT",
      message: "Password must contain at least 1 letter and 1 number",
    });
  }
  return value;
};

export const phone: Joi.CustomValidator<string> = (value, helpers) => {
  if (!value.match(/^\d{10}$/)) {
    return helpers.error("any.invalid", {
      code: "PHONE_FORMAT",
      message: "Phone number must be exactly 10 digits",
    });
  }
  return value;
};
