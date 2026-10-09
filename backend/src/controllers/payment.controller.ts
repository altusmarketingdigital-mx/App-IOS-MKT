import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Payment } from '../models/Payment';
import { OrderSale } from '../models/OrderSale';

export class PaymentController {
    static async create(req: Request, res: Response) {
        try {
            const { id, order_id, amount, payment_method, date } = req.body;
            const orderRepo = AppDataSource.getRepository(OrderSale);
            const payRepo = AppDataSource.getRepository(Payment);
            
            const order = await orderRepo.findOneBy({ id: order_id });
            if (!order) return res.status(404).json({ error: 'Order not found' });
            
            const payment = payRepo.create({
                id,
                order,
                amount,
                payment_method,
                date: date ? new Date(date) : new Date()
            });
            await payRepo.save(payment);
            return res.status(201).json(payment);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
