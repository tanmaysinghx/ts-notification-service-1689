import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notificationRoutes';

const app = express();

//app.use(transactionIdMiddleware);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
//app.use(loggerConsole);

app.use('/api', notificationRoutes);

export default app;