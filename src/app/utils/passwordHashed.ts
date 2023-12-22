import bcrypt from 'bcrypt';
import config from '../config';

const passwordHashed = async (plainTextPassword: string) => {
  const newHashedPassword = await bcrypt.hash(
    plainTextPassword,
    Number(config.BCRYPT_SALT_ROUND),
  );
  return newHashedPassword;
};

export default passwordHashed;
