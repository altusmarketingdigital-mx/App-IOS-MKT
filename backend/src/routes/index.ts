import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { ExpenseController } from '../controllers/expense.controller';

import { QuoteController } from '../controllers/quote.controller';
import { OrderSaleController } from '../controllers/ordersale.controller';
import { PaymentController } from '../controllers/payment.controller';
import { SupplierController } from '../controllers/supplier.controller';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Rutas de Clientes
router.post('/clients', ClientController.create);
router.get('/clients', ClientController.getAll);
router.put('/clients/:id', ClientController.update);
router.delete('/clients/:id', ClientController.delete);

// Rutas de Usuarios / Auth
router.post('/users', UserController.create);
router.get('/users', UserController.getAll);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
router.post('/auth/login', UserController.login);

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

// Rutas de Proveedores
router.post('/suppliers', SupplierController.createSupplier);
router.get('/suppliers', SupplierController.getAllSuppliers);
router.post('/supplier-payments', SupplierController.createPayment);

export default router;
