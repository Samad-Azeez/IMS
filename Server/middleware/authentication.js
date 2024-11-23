import { User } from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

// Middleware to authenticate the user by verifying the token in the header of the request object
export const auth = async (req, res, next) => {
  // check if the authorization header is provided
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  // get the token from the header
  const token = authHeader.split(' ')[1];

  try {
    // verify the token
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    //attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    // if the token is invalid or expired, throw an error
    throw new UnauthenticatedError('Authentication invalid');
  }
};
