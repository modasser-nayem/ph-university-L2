import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
};
