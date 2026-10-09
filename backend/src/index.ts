import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { AppDataSource } from './database';
import routes from './routes';
import { HTML_CONTENT } from './html';

// Base Route (Healthcheck fallback)
app.get('/health', (req: Request, res: Response) => {
    res.json({ 
        message: 'Altus MKT API Running successfully',
        db_url_configured: !!(process.env as any).DATABASE_URL
    });
});

// Servir la Aplicación Web (PWA) de forma directa
// Lo colocamos ANTES de la base de datos para que cargue instantáneo.
app.use((req: Request, res: Response, next: NextFunction) => {
    // Si la URL original en el navegador pedía un endpoint de la API, dejamos pasar.
    if (req.originalUrl.startsWith('/api')) {
        return next();
    }
    // Si el usuario entra a la raíz "/", servimos la web estática.
    res.setHeader('Content-Type', 'text/html');
    res.send(HTML_CONTENT);
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

// Middleware de Seguridad (Fase 7)
const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    const apiKey = req.headers['x-api-key'];
    const validKey = (process.env as any).API_KEY || "SECRET_TOKEN_ALTUS";
    if (apiKey !== validKey) {
        return res.status(401).json({ error: "Unauthorized", message: "Invalid API Key" });
    }
    next();
};

app.use('/api', authMiddleware);
// En caso de que Vercel pase la ruta sin el prefijo /api
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        return authMiddleware(req, res, next);
    }
    next();
});

// Para Vercel: hacer match de las rutas directamente y con /api
app.use('/api', routes);
app.use(routes);

if ((process.env as any).NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
export default app;
