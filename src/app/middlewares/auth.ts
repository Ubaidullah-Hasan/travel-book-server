import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';
import { verifyToken } from '../utils/verifyJWT';
import { UserModel } from '../modules/User/user.model';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log('Received Token:', token);


    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const status = user?.status;

    if (status === USER_STATUS.BLOCKED) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    // if (
    //   user.passwordChangedAt &&
    //   UserModel.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // } // todo

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
