import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notificationRoutes';
import { loggerConsole } from './middleware/loggerConsole';
import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';

const app = express();

app.use(transactionIdMiddleware);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(loggerConsole);

app.use('/v2/api', notificationRoutes);

export default app;