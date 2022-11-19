import * as Joi from 'joi';
import { IUserLogin } from '../interfaces/userInterfaces';

const userLoginValidate = ({ username, password }: IUserLogin): IUserLogin => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).required().messages({
      'string.empty': 'All fields must be filled',
      'string.min': 'username must be at least 3 characters long',
    }),
    password: Joi.string().min(8).regex((/(?=.*[A-Z])(?=.*\d)/)).required()
      .messages({
        'string.empty': 'All fields must be filled',
        'string.min': 'password must be at least 8 characters long',
        'string.pattern.base': 'password must contain at least one uppercase letter and one number',
      }),
  });

  const { error, value } = schema.validate({ username, password });
  if (error) {
    const err = new Error(error.details[0].message);
    err.name = 'validationError';
    throw err;
  }
  return value;
};

export default userLoginValidate;
