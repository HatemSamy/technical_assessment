import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { globalErrorHandling } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { router as apiRouter } from './routes/index.js';
import { swaggerRouter } from './routes/swagger.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', swaggerRouter);
app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(globalErrorHandling);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
