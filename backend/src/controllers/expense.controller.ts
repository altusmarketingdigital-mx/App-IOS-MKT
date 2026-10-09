import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Expense } from '../models/Expense';

export class ExpenseController {
    static async create(req: Request, res: Response) {
        try {
            const { id, description, amount, payment_method, notes, date } = req.body;
            const expenseRepository = AppDataSource.getRepository(Expense);
            
            const expense = expenseRepository.create({
                id, // Soportamos el UUID generado en iOS (Offline-first)
                description,
                amount,
                payment_method,
                notes,
                date: date ? new Date(date) : new Date()
            });

            await expenseRepository.save(expense);
            return res.status(201).json(expense);
        } catch (error) {
            console.error('Error creando gasto:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const expenseRepository = AppDataSource.getRepository(Expense);
            const expenses = await expenseRepository.find({ order: { date: 'DESC' } });
            return res.status(200).json(expenses);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
