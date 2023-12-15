/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DB_URI as string).then(() => {
      console.log(`DB IS CONNECT ON ${mongoose.connection.host}`);
    });
    server = app.listen(config.PORT, () => {
      console.log(`SERVER IS RUNNING AT http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Unhandled Promise Rejection
process.on('unhandledRejection', () => {
  console.log(`Unhandled Rejection is detected shutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Uncaught Exception
process.on('uncaughtException', () => {
  console.log(`Uncaught Exception is detected shutting down the server`);
  process.exit(1);
});
