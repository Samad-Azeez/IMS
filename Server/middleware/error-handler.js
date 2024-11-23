// import { CustomAPIError } from '../errors/custom-api.js';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // not needed but added for clarity to also output the error to the console 😛😛
  console.error(err);

  // set default error object with default values if not provided by the error object
  let customError = {
    //set default
    StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong try again later',
  };

  // handle custom API error
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  // handle mongoose duplicate key error
  if (err.code && err.code === 11000) {
    customError = {
      StatusCode: 400,
      msg: `Duplicate value entered for ${
        Object.keys(err.keyValue)[0]
      } field, please choose another value`,
    };
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.StatusCode).json({ msg: customError.msg });
};
