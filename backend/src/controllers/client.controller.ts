import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Client } from '../models/Client';

export class ClientController {
    static async create(req: Request, res: Response) {
        try {
            const { id, name, phone, email, address, contact_name, rfc, website, client_type } = req.body;
            const clientRepository = AppDataSource.getRepository(Client);
            
            const client = clientRepository.create({
                id, // Soportamos el UUID generado en iOS (Offline-first)
                name,
                phone,
                email,
                address,
                contact_name,
                rfc,
                website,
                client_type
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

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const clientRepository = AppDataSource.getRepository(Client);
            const client = await clientRepository.findOneBy({ id });
            if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });

            clientRepository.merge(client, req.body);
            await clientRepository.save(client);
            return res.status(200).json(client);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const clientRepository = AppDataSource.getRepository(Client);
            const client = await clientRepository.findOneBy({ id });
            if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });

            await clientRepository.remove(client);
            return res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
