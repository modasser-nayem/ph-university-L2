import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parser use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Application Routes

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to PH University');
});

export default app;
