import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.db_url as string).then(() => {
      // eslint-disable-next-line
      console.log(`DB IS CONNECT ON ${mongoose.connection.host}`);
    });
    app.listen(config.port, () => {
      // eslint-disable-next-line
      console.log(`SERVER IS RUNNING AT http://localhost:${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}

main();
