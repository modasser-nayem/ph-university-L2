import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../user/user.interface';
import config from '../../config';

export const createJwtToken = (
  payload: { id: string; role: TUserRole },
  tokenType: 'access_token' | 'refresh_token',
  expiresIn?: string,
) => {
  if (tokenType === 'access_token') {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
      expiresIn: expiresIn || config.JWT_ACCESS_EXPIRES_IN,
    });
  }
  if (tokenType === 'refresh_token') {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET as string, {
      expiresIn: expiresIn || config.JWT_REFRESH_EXPIRES_IN,
    });
  }
};

export const verifyJwtToken = (
  token: string,
  tokenType: 'access_token' | 'refresh_token',
) => {
  let decode;
  if (tokenType === 'access_token') {
    decode = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
  }

  if (tokenType === 'refresh_token') {
    decode = jwt.verify(
      token,
      config.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;
  }

  return decode as JwtPayload;
};
