import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { verifyJwtToken } from '../modules/auth/auth.utils';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // decode access token
    const decode = verifyJwtToken(token, 'access_token');

    const { id, role, iat } = decode;

    const user = await User.isUserExistsByCustomId(id);

    // if user not exist
    if (!user) {
      throw new AppError(404, 'This user not found!');
    }

    // if user deleted
    if (user.isDeleted) {
      throw new AppError(403, 'This user is deleted');
    }

    // if user blocked
    if (user.status === 'blocked') {
      throw new AppError(403, 'This user is blocked');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(401, 'You are not authorized!');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }
    // set user on req
    req.user = decode;
    next();
  });
};

export default auth;
