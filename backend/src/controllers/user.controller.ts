import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../models/User';

export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const { name, email, role, phone, credential_id } = req.body;
            const repo = AppDataSource.getRepository(User);
            
            const user = repo.create({
                name,
                email,
                role,
                phone,
                credential_id
            });

            await repo.save(user);
            return res.status(201).json(user);
        } catch (error: any) {
            console.error('Error creando usuario:', error);
            if (error.code === '23505') { // unique violation en Postgres
                return res.status(400).json({ error: 'El correo electrónico ya existe.' });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(User);
            const users = await repo.find({ order: { created_at: 'DESC' } });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    // Login con Credential ID (Passkey / FIDO2 simplificado)
    static async login(req: Request, res: Response) {
        try {
            const { credential_id } = req.body;
            if (!credential_id) return res.status(400).json({ error: 'credential_id requerido' });

            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOne({ where: { credential_id } });

            if (!user) {
                return res.status(401).json({ error: 'Huella / FaceID no reconocida o usuario no encontrado.' });
            }

            // Simulamos generación de token o simplemente retornamos éxito y rol del usuario
            return res.status(200).json({ success: true, user, token: 'SECRET_TOKEN_ALTUS' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
