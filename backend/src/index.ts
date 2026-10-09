import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { AppDataSource } from './database';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = (process.env as any).PORT || 3000;

app.use(cors() as any);
app.use(express.json());

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Altus MKT</title>
    <meta name="theme-color" content="#2563eb">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/2953/2953330.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; }
        .ios-card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 16px; }
        .ios-btn { background-color: #2563eb; color: white; padding: 12px 20px; border-radius: 10px; font-weight: 600; width: 100%; text-align: center; display: inline-block; cursor: pointer; }
    </style>
</head>
<body class="antialiased">
    <div id="loginScreen" class="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        <img src="https://cdn-icons-png.flaticon.com/512/2953/2953330.png" class="w-24 h-24 mb-6" alt="Logo">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Altus MKT</h1>
        <p class="text-gray-500 mb-8">Agencia Digital</p>
        <div class="w-full max-w-sm">
            <input type="password" id="pinInput" placeholder="PIN de Acceso" class="w-full text-center p-4 border border-gray-300 rounded-xl mb-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <p id="loginError" class="text-red-500 text-sm text-center mb-4 hidden">PIN incorrecto.</p>
            <button onclick="login()" class="ios-btn">Entrar</button>
        </div>
    </div>
    <div id="appScreen" class="hidden min-h-screen pb-24">
        <div class="bg-blue-600 text-white pt-12 pb-4 px-6 shadow-md rounded-b-3xl">
            <h1 class="text-2xl font-bold">Panel de Control</h1>
            <p class="text-blue-200 text-sm" id="syncStatus">Sincronizado en la Nube</p>
        </div>
        <div class="p-4" id="mainContent">
            <h2 class="text-xl font-bold text-gray-800 mt-4 mb-4">Clientes Recientes</h2>
            <div id="clientsList"><div class="text-center text-gray-500 py-8">Cargando...</div></div>
            <button onclick="showAddClientForm()" class="ios-btn mt-4">+ Nuevo Cliente</button>
        </div>
        <div id="addClientModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
            <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-12">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Añadir Cliente</h3>
                    <button onclick="closeModal()" class="text-gray-500 font-bold text-xl">&times;</button>
                </div>
                <input type="text" id="cName" placeholder="Nombre de la empresa" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="tel" id="cPhone" placeholder="Teléfono" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="email" id="cEmail" placeholder="Correo" class="w-full p-3 bg-gray-100 rounded-lg mb-6 focus:outline-none">
                <button onclick="saveClient()" class="ios-btn">Guardar</button>
            </div>
        </div>
    </div>
    <script>
        const API_URL = '/api';
        let apiKey = localStorage.getItem('altus_api_key');
        if (apiKey) {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('appScreen').classList.remove('hidden');
            loadClients();
        }
        function login() {
            const pin = document.getElementById('pinInput').value;
            if (pin === 'ALTUS2026') {
                apiKey = 'SECRET_TOKEN_ALTUS';
                localStorage.setItem('altus_api_key', apiKey);
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('appScreen').classList.remove('hidden');
                loadClients();
            } else {
                document.getElementById('loginError').classList.remove('hidden');
            }
        }
        async function apiRequest(endpoint, method = 'GET', body = null) {
            const headers = { 'x-api-key': apiKey, 'Content-Type': 'application/json' };
            const options = { method, headers };
            if (body) options.body = JSON.stringify(body);
            try {
                const response = await fetch(\`\${API_URL}\${endpoint}\`, options);
                if (response.status === 401) {
                    localStorage.removeItem('altus_api_key');
                    location.reload();
                }
                return await response.json();
            } catch (error) {
                alert("Error de conexión.");
            }
        }
        async function loadClients() {
            const container = document.getElementById('clientsList');
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Cargando datos...</div>';
            const clients = await apiRequest('/clients');
            if (!clients) return;
            if (clients.length === 0) {
                container.innerHTML = '<div class="ios-card text-center text-gray-500">No hay clientes aún.</div>';
                return;
            }
            container.innerHTML = clients.map(c => \`<div class="ios-card flex justify-between items-center"><div><h3 class="font-bold text-gray-800">\${c.name}</h3><p class="text-sm text-gray-500">\${c.phone || 'Sin teléfono'}</p></div><div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">\${c.name.charAt(0).toUpperCase()}</div></div>\`).join('');
        }
        function showAddClientForm() { document.getElementById('addClientModal').classList.remove('hidden'); }
        function closeModal() {
            document.getElementById('addClientModal').classList.add('hidden');
            document.getElementById('cName').value = ''; document.getElementById('cPhone').value = ''; document.getElementById('cEmail').value = '';
        }
        async function saveClient() {
            const name = document.getElementById('cName').value;
            const phone = document.getElementById('cPhone').value;
            const email = document.getElementById('cEmail').value;
            if (!name) return alert("El nombre es obligatorio");
            const newClient = { id: crypto.randomUUID(), name, phone, email, isSynced: true };
            await apiRequest('/clients', 'POST', newClient);
            closeModal();
            loadClients();
        }
    </script>
</body>
</html>`;

// Base Route (Healthcheck fallback)
app.get('/health', (req: Request, res: Response) => {
    res.json({ 
        message: 'Altus MKT API Running successfully',
        db_url_configured: !!(process.env as any).DATABASE_URL
    });
});

// Servir la Aplicación Web (PWA) de forma directa
// Lo colocamos ANTES de la base de datos para que cargue instantáneo.
app.use((req: Request, res: Response, next: NextFunction) => {
    // Si la URL original en el navegador pedía un endpoint de la API, dejamos pasar.
    if (req.originalUrl.startsWith('/api')) {
        return next();
    }
    // Si el usuario entra a la raíz "/", servimos la web estática.
    res.setHeader('Content-Type', 'text/html');
    res.send(HTML_CONTENT);
});

// Middleware para base de datos con prevención de Timeout
app.use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!(process.env as any).DATABASE_URL) {
        return res.status(500).json({ 
            error: "FALTA_VARIABLE_ENTORNO", 
            message: "La variable DATABASE_URL no fue encontrada en Vercel." 
        });
    }

    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        next();
    } catch (error: any) {
        console.error('Error DB:', error);
        return res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Middleware de Seguridad (Fase 7)
const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    const apiKey = req.headers['x-api-key'];
    const validKey = (process.env as any).API_KEY || "SECRET_TOKEN_ALTUS";
    if (apiKey !== validKey) {
        return res.status(401).json({ error: "Unauthorized", message: "Invalid API Key" });
    }
    next();
};

app.use('/api', authMiddleware);
// En caso de que Vercel pase la ruta sin el prefijo /api
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        return authMiddleware(req, res, next);
    }
    next();
});

// Para Vercel: hacer match de las rutas directamente y con /api
app.use('/api', routes);
app.use(routes);

if ((process.env as any).NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
export default app;
