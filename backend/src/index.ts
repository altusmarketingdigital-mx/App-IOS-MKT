import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './database';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = (process.env as any).PORT || 3000;

// Middlewares
app.use(cors() as any);
app.use(express.json());

// Base Route
app.get('/', (req: Request, res: Response) => {
    res.json({ 
        message: 'Altus MKT API Running successfully',
        db_url_configured: !!(process.env as any).DATABASE_URL
    });
});

// Lazy load Database connection for Vercel
app.use(async (req, res, next) => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        next();
    } catch (error: any) {
        console.error('Error DB:', error);
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

app.use('/api', routes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
export default app;
