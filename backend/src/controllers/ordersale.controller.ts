import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { OrderSale } from '../models/OrderSale';
import { Client } from '../models/Client';

export class OrderSaleController {
    static async create(req: Request, res: Response) {
        try {
            const { id, client_id, quote_id, total, status, created_at } = req.body;
            const clientRepo = AppDataSource.getRepository(Client);
            const saleRepo = AppDataSource.getRepository(OrderSale);
            
            const client = await clientRepo.findOneBy({ id: client_id });
            if (!client) return res.status(404).json({ error: 'Client not found' });
            
            const sale = saleRepo.create({
                id,
                client,
                total,
                status: status || 'Pending',
                created_at: created_at ? new Date(created_at) : new Date()
            });
            await saleRepo.save(sale);
            return res.status(201).json(sale);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(OrderSale);
            const sales = await repo.find({ 
                relations: { client: true },
                order: { created_at: 'DESC' } 
            });
            return res.status(200).json(sales);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
