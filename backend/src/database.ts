import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: (process.env as any).DATABASE_URL, // String de conexión de Supabase
    ssl: {
        rejectUnauthorized: false // Requerido por Supabase
    },
    synchronize: true, // True solo para desarrollo local, crea/actualiza tablas automáticamente
    logging: false,
    entities: [__dirname + '/models/**/*{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    subscribers: [],
});
