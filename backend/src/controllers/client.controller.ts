import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Client } from '../models/Client';

export class ClientController {
    static async create(req: Request, res: Response) {
        try {
            const { id, name, phone, email, address } = req.body;
            const clientRepository = AppDataSource.getRepository(Client);
            
            const client = clientRepository.create({
                id, // Soportamos el UUID generado en iOS (Offline-first)
                name,
                phone,
                email,
                address
            });

            await clientRepository.save(client);
            return res.status(201).json(client);
        } catch (error) {
            console.error('Error creando cliente:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const clientRepository = AppDataSource.getRepository(Client);
            const clients = await clientRepository.find({ order: { created_at: 'DESC' } });
            return res.status(200).json(clients);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
