import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Supplier } from '../models/Supplier';
import { SupplierPayment } from '../models/SupplierPayment';

export class SupplierController {
    static async createSupplier(req: Request, res: Response) {
        try {
            const { id, name, contact_info, initial_debt, created_at } = req.body;
            const repo = AppDataSource.getRepository(Supplier);
            
            const supplier = repo.create({
                id,
                name,
                contact_info,
                initial_debt: initial_debt || 0,
                created_at: created_at ? new Date(created_at) : new Date()
            });
            await repo.save(supplier);
            return res.status(201).json(supplier);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAllSuppliers(req: Request, res: Response) {
        try {
            const repo = AppDataSource.getRepository(Supplier);
            const suppliers = await repo.find({ order: { name: 'ASC' } });
            return res.status(200).json(suppliers);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createPayment(req: Request, res: Response) {
        try {
            const { id, supplier_id, amount, description, date } = req.body;
            const supplierRepo = AppDataSource.getRepository(Supplier);
            const paymentRepo = AppDataSource.getRepository(SupplierPayment);
            
            const supplier = await supplierRepo.findOneBy({ id: supplier_id });
            if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
            
            const payment = paymentRepo.create({
                id,
                supplier,
                amount,
                description,
                date: date ? new Date(date) : new Date()
            });
            await paymentRepo.save(payment);
            return res.status(201).json(payment);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
