import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';

const config = require('../../config/env');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .exec()
    .then((foundUser) => {
      console.log(foundUser);
      if (foundUser) {
        if (!foundUser.validPassword(req.body.password)) {
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
          return next(err);
        }
        const token = jwt.sign({
          email: foundUser.email,
          isAdmin: foundUser.isAdmin
        }, config.jwtSecret);
        return res.json({
          token,
          firstName: foundUser.firstName,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin
        });
      }
      const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
      return next(err);
    });
}

export default { login };
