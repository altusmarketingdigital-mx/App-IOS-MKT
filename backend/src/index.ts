import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './database';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = (process.env as any).PORT || 3000;

app.use(cors() as any);
app.use(express.json());

// Base Route (Healthcheck)
app.get('/', (req: Request, res: Response) => {
    res.json({ 
        message: 'Altus MKT API Running successfully',
        db_url_configured: !!(process.env as any).DATABASE_URL
    });
});

// Middleware para base de datos con prevención de Timeout
app.use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!(process.env as any).DATABASE_URL) {
        return res.status(500).json({ 
            error: "FALTA_VARIABLE_ENTORNO", 
            message: "La variable DATABASE_URL no fue encontrada en Vercel." 
        });
    }

    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        next();
    } catch (error: any) {
        console.error('Error DB:', error);
        return res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

app.use('/api', routes);

if ((process.env as any).NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
export default app;
