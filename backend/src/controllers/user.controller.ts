import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../models/User';

export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const { name, email, role, phone, password, credential_id } = req.body;
            const repo = AppDataSource.getRepository(User);
            
            const user = repo.create({
                name,
                email,
                role,
                phone,
                password,
                credential_id
            });

            await repo.save(user);
            return res.status(201).json(user);
        } catch (error: any) {
            if (error.code === '23505') {
                return res.status(400).json({ error: 'El correo electronico ya existe.' });
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

    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneBy({ id });
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

            repo.merge(user, req.body);
            await repo.save(user);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneBy({ id });
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

            await repo.remove(user);
            return res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    static async login(req: Request, res: Response) {
        try {
            const { email, password, credential_id } = req.body;
            const repo = AppDataSource.getRepository(User);
            
            let user = null;

            if (credential_id) {
                user = await repo.findOne({ where: { credential_id } });
                if (!user) return res.status(401).json({ error: 'Huella / FaceID no reconocida.' });
            } else if (email && password) {
                user = await repo.findOne({ where: { email: email.toLowerCase().trim(), password: password.trim() } });
                if (!user) return res.status(401).json({ error: 'Correo o contrasena incorrectos.' });
            } else {
                return res.status(400).json({ error: 'Credenciales incompletas.' });
            }

            return res.status(200).json({ success: true, user, token: 'SECRET_TOKEN_ALTUS' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async setupAdmin(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(User);
            let admin = await repo.findOne({ where: { email: 'admin@altus.mx' } });
            
            if (admin) {
                admin.password = 'Altus2026';
                await repo.save(admin);
                return res.status(200).json({ message: 'Admin existe. Password restablecido a Altus2026' });
            }
            
            admin = repo.create({
                name: 'Administrador Altus',
                email: 'admin@altus.mx',
                password: 'admin',
                role: 'Administrador',
                phone: '5555555555'
            });
            await repo.save(admin);
            return res.status(201).json({ message: 'Usuario admin creado', email: 'admin@altus.mx', password: 'admin' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

