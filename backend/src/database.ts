import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import 'pg'; // <--- EXPLICIT IMPORT FOR VERCEL ESBUILD
import { Client } from './models/Client';
import { Expense } from './models/Expense';
import { Quote } from './models/Quote';
import { OrderSale } from './models/OrderSale';
import { Payment } from './models/Payment';
import { Supplier } from './models/Supplier';
import { SupplierPayment } from './models/SupplierPayment';
import { User } from './models/User';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: (process.env as any).DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy',
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: true,
    logging: false,
    entities: [Client, Expense, Quote, OrderSale, Payment, Supplier, SupplierPayment, User],
    migrations: [],
    subscribers: [],
});
