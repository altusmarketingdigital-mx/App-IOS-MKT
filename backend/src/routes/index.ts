import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { ExpenseController } from '../controllers/expense.controller';

import { QuoteController } from '../controllers/quote.controller';
import { OrderSaleController } from '../controllers/ordersale.controller';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();

// Rutas de Clientes
router.post('/clients', ClientController.create);
router.get('/clients', ClientController.getAll);

// Rutas de Gastos
router.post('/expenses', ExpenseController.create);
router.get('/expenses', ExpenseController.getAll);

// Rutas de Cotizaciones
router.post('/quotes', QuoteController.create);
router.get('/quotes', QuoteController.getAll);

// Rutas de Ventas y Pagos
router.post('/sales', OrderSaleController.create);
router.get('/sales', OrderSaleController.getAll);
router.post('/payments', PaymentController.create);

export default router;
