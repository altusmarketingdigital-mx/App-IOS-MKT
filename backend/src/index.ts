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
    res.json({ message: 'Altus MKT API Running successfully' });
});

app.use('/api', routes);

// Initialize Database & Server
AppDataSource.initialize()
    .then(() => {
        console.log('✅ Conexión a Supabase (PostgreSQL) establecida exitosamente.');
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            });
        }
    })
    .catch((error: any) => console.log('❌ Error al conectar a la base de datos:', error));

export default app;
