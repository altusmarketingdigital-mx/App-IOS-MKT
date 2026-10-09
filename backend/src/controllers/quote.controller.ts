import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Quote } from '../models/Quote';
import { Client } from '../models/Client';

export class QuoteController {
    static async create(req: Request, res: Response) {
        try {
            const { id, client_id, subtotal, taxes, total, status, created_at } = req.body;
            
            const clientRepository = AppDataSource.getRepository(Client);
            const quoteRepository = AppDataSource.getRepository(Quote);
            
            const client = await clientRepository.findOneBy({ id: client_id });
            if (!client) {
                return res.status(404).json({ error: 'Client not found' });
            }

            const quote = quoteRepository.create({
                id,
                client,
                subtotal,
                taxes,
                total,
                status: status || 'Pending',
                created_at: created_at ? new Date(created_at) : new Date()
            });

            await quoteRepository.save(quote);
            return res.status(201).json(quote);
        } catch (error) {
            console.error('Error creando cotización:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    static async getAll(req: Request, res: Response) {
        try {
            const quoteRepository = AppDataSource.getRepository(Quote);
            const quotes = await quoteRepository.find({ 
                relations: { client: true },
                order: { created_at: 'DESC' } 
            });
            return res.status(200).json(quotes);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
