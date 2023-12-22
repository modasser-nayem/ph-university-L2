import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createJwtToken, verifyJwtToken } from './auth.utils';
import sendEmail from '../../utils/sendEmail';
import passwordHashed from '../../utils/passwordHashed';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

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

  // check password match
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(403, 'Password does not matched');
  }

  // create access_token
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(jwtPayload, 'access_token');

  const refreshToken = createJwtToken(jwtPayload, 'refresh_token');

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userId: string,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userId);

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(400, 'Password does not match');
  }

  // hash new password
  const newHashedPassword = passwordHashed(payload.newPassword);

  // update password
  await User.findOneAndUpdate(
    { id: userId, role: user.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(401, 'You are not authorized!');
  }
  // decode access token
  const decode = verifyJwtToken(token, 'refresh_token');

  const { id, iat } = decode;

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
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized!');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(jwtPayload, 'access_token');

  return { accessToken };
};

const forgetPassword = async (id: string) => {
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

  // create access_token
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(jwtPayload, 'access_token', '10m');

  const resetLink = `${config.CLIENT_URL}?id=${user.id}&token=${accessToken}`;

  // send mail
  await sendEmail(user.email, resetLink);

  return null;
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload.id);

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

  // verify token
  const decode = verifyJwtToken(token, 'access_token');

  if (payload.id !== decode.id) {
    throw new AppError(401, 'You are not authorized!');
  }

  // hash new password
  const newHashedPassword = await passwordHashed(payload.newPassword);

  // update password
  await User.findOneAndUpdate(
    { id: decode.id, role: decode.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
