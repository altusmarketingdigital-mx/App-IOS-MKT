export const HTML_CONTENT = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Altus MKT</title>
    <meta name="theme-color" content="#2563eb">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/2953/2953330.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding-bottom: 80px; }
        .ios-card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 16px; }
        .ios-btn { background-color: #2563eb; color: white; padding: 12px 20px; border-radius: 10px; font-weight: 600; width: 100%; text-align: center; display: inline-block; cursor: pointer; }
        .tab-btn { flex: 1; text-align: center; color: #6b7280; padding: 10px 0; font-size: 0.75rem; font-weight: 500; cursor: pointer; }
        .tab-btn.active { color: #2563eb; }
        .tab-icon { font-size: 1.25rem; display: block; margin-bottom: 2px; }
    </style>
</head>
<body class="antialiased">

    <!-- Pantalla de Login -->
    <div id="loginScreen" class="min-h-screen flex flex-col items-center justify-center px-4 bg-white z-50 relative">
        <img src="https://cdn-icons-png.flaticon.com/512/2953/2953330.png" class="w-24 h-24 mb-6" alt="Logo">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Altus MKT</h1>
        <p class="text-gray-500 mb-8">Agencia Digital</p>
        
        <div class="w-full max-w-sm">
            <input type="password" id="pinInput" placeholder="PIN de Acceso" class="w-full text-center p-4 border border-gray-300 rounded-xl mb-4 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <p id="loginError" class="text-red-500 text-sm text-center mb-4 hidden">PIN incorrecto.</p>
            <button onclick="login()" class="ios-btn">Entrar</button>
        </div>
    </div>

    <!-- Aplicación Principal (Oculta al inicio) -->
    <div id="appScreen" class="hidden">
        <!-- Navegación Superior -->
        <div class="bg-blue-600 text-white pt-12 pb-4 px-6 shadow-md rounded-b-3xl sticky top-0 z-40">
            <h1 class="text-2xl font-bold" id="headerTitle">Clientes</h1>
            <p class="text-blue-200 text-sm">Altus MKT en la Nube</p>
        </div>

        <!-- VISTAS -->
        <div class="p-4" id="mainContent">
            
            <!-- Vista Clientes -->
            <div id="view-clients" class="view-section">
                <div id="clientsList"><div class="text-center text-gray-500 py-8">Cargando...</div></div>
                <button onclick="showModal('addClientModal')" class="ios-btn mt-4">+ Nuevo Cliente</button>
            </div>

            <!-- Vista Cotizaciones -->
            <div id="view-quotes" class="view-section hidden">
                <div id="quotesList"><div class="text-center text-gray-500 py-8">Cargando...</div></div>
                <button onclick="showModal('addQuoteModal')" class="ios-btn mt-4">+ Nueva Cotización</button>
            </div>

            <!-- Vista Ventas -->
            <div id="view-sales" class="view-section hidden">
                <div id="salesList"><div class="text-center text-gray-500 py-8">Cargando...</div></div>
                <!-- Las ventas se generan desde cotizaciones, pero ponemos un botón por si acaso -->
                <button onclick="alert('Genera una venta convirtiendo una Cotización')" class="ios-btn mt-4 bg-gray-400">Las ventas vienen de las cotizaciones</button>
            </div>

            <!-- Vista Gastos -->
            <div id="view-expenses" class="view-section hidden">
                <div id="expensesList"><div class="text-center text-gray-500 py-8">Cargando...</div></div>
                <button onclick="showModal('addExpenseModal')" class="ios-btn mt-4">+ Nuevo Gasto</button>
            </div>

        </div>

        <!-- Menú Inferior (Tab Bar iOS) -->
        <div class="fixed bottom-0 w-full bg-white border-t flex justify-around shadow-lg pb-safe z-40">
            <div class="tab-btn active" onclick="switchTab('clients', 'Clientes')" id="tab-clients">
                <span class="tab-icon">👥</span> Clientes
            </div>
            <div class="tab-btn" onclick="switchTab('quotes', 'Cotizaciones')" id="tab-quotes">
                <span class="tab-icon">📄</span> Cotizaciones
            </div>
            <div class="tab-btn" onclick="switchTab('sales', 'Ventas')" id="tab-sales">
                <span class="tab-icon">💰</span> Ventas
            </div>
            <div class="tab-btn" onclick="switchTab('expenses', 'Gastos')" id="tab-expenses">
                <span class="tab-icon">📉</span> Gastos
            </div>
        </div>
        
        <!-- Formularios Modales -->

        <!-- Modal Cliente -->
        <div id="addClientModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
            <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-12">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Añadir Cliente</h3>
                    <button onclick="hideModal('addClientModal')" class="text-gray-500 font-bold text-xl">&times;</button>
                </div>
                <input type="text" id="cName" placeholder="Nombre de la empresa" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="tel" id="cPhone" placeholder="Teléfono" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="email" id="cEmail" placeholder="Correo" class="w-full p-3 bg-gray-100 rounded-lg mb-6 focus:outline-none">
                <button onclick="saveClient()" class="ios-btn">Guardar Cliente</button>
            </div>
        </div>

        <!-- Modal Gasto -->
        <div id="addExpenseModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
            <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-12">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Añadir Gasto</h3>
                    <button onclick="hideModal('addExpenseModal')" class="text-gray-500 font-bold text-xl">&times;</button>
                </div>
                <input type="text" id="eDesc" placeholder="Descripción del Gasto" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="number" id="eAmount" placeholder="Monto (MXN)" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <button onclick="saveExpense()" class="ios-btn">Registrar Gasto</button>
            </div>
        </div>

        <!-- Modal Cotización -->
        <div id="addQuoteModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
            <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-12">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Nueva Cotización</h3>
                    <button onclick="hideModal('addQuoteModal')" class="text-gray-500 font-bold text-xl">&times;</button>
                </div>
                <p class="text-sm text-gray-500 mb-4">Nota: Esta es una versión web rápida. Asegúrate de poner el ID exacto del cliente (UUID) o la dejaremos sin asignar.</p>
                <input type="text" id="qDesc" placeholder="Concepto (ej. Campaña Redes)" class="w-full p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none">
                <input type="number" id="qTotal" placeholder="Total a cobrar" class="w-full p-3 bg-gray-100 rounded-lg mb-6 focus:outline-none">
                <button onclick="saveQuote()" class="ios-btn">Generar Cotización</button>
            </div>
        </div>

    </div>

    <script>
        const API_URL = '/api';
        let apiKey = localStorage.getItem('altus_api_key');

        if (apiKey) {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('appScreen').classList.remove('hidden');
            loadAllData();
        }

        function login() {
            const pin = document.getElementById('pinInput').value;
            if (pin === 'ALTUS2026') {
                apiKey = 'SECRET_TOKEN_ALTUS';
                localStorage.setItem('altus_api_key', apiKey);
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('appScreen').classList.remove('hidden');
                loadAllData();
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
                console.error(error);
                return null;
            }
        }

        function switchTab(tab, title) {
            document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById('view-' + tab).classList.remove('hidden');
            document.getElementById('tab-' + tab).classList.add('active');
            document.getElementById('headerTitle').innerText = title;

            if(tab === 'clients') loadClients();
            if(tab === 'quotes') loadQuotes();
            if(tab === 'sales') loadSales();
            if(tab === 'expenses') loadExpenses();
        }

        function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
        function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

        async function loadAllData() {
            loadClients();
            loadQuotes();
            loadSales();
            loadExpenses();
        }

        // --- CLIENTES ---
        async function loadClients() {
            const container = document.getElementById('clientsList');
            const clients = await apiRequest('/clients');
            if (!clients || clients.length === 0) {
                container.innerHTML = '<div class="ios-card text-center text-gray-500">No hay clientes aún.</div>';
                return;
            }
            container.innerHTML = clients.map(c => \`<div class="ios-card">
                <h3 class="font-bold text-gray-800">\${c.name}</h3>
                <p class="text-sm text-gray-500">\${c.phone || 'Sin teléfono'}</p>
            </div>\`).join('');
        }

        async function saveClient() {
            const name = document.getElementById('cName').value;
            if (!name) return alert("El nombre es obligatorio");
            const newClient = { id: crypto.randomUUID(), name, phone: document.getElementById('cPhone').value, email: document.getElementById('cEmail').value, isSynced: true };
            await apiRequest('/clients', 'POST', newClient);
            hideModal('addClientModal');
            loadClients();
        }

        // --- COTIZACIONES ---
        async function loadQuotes() {
            const container = document.getElementById('quotesList');
            const quotes = await apiRequest('/quotes');
            if (!quotes || quotes.length === 0) {
                container.innerHTML = '<div class="ios-card text-center text-gray-500">No hay cotizaciones.</div>';
                return;
            }
            container.innerHTML = quotes.map(q => \`<div class="ios-card flex justify-between">
                <div><h3 class="font-bold text-gray-800">$\${q.total.toFixed(2)}</h3><p class="text-xs text-gray-500">\${q.status}</p></div>
                <button onclick="approveQuote('\${q.id}', \${q.total})" class="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-bold">Aprobar Venta</button>
            </div>\`).join('');
        }

        async function saveQuote() {
            const total = parseFloat(document.getElementById('qTotal').value);
            if (!total) return alert("Total inválido");
            const newQuote = { id: crypto.randomUUID(), total, status: 'Sent', isSynced: true };
            await apiRequest('/quotes', 'POST', newQuote);
            hideModal('addQuoteModal');
            loadQuotes();
        }

        // --- VENTAS ---
        async function approveQuote(quoteId, total) {
            if(!confirm('¿Convertir esta cotización en una venta oficial?')) return;
            const newSale = { id: crypto.randomUUID(), total, status: 'In Process', isSynced: true };
            await apiRequest('/sales', 'POST', newSale);
            alert("Venta registrada con éxito.");
            switchTab('sales', 'Ventas');
        }

        async function loadSales() {
            const container = document.getElementById('salesList');
            const sales = await apiRequest('/sales');
            if (!sales || sales.length === 0) {
                container.innerHTML = '<div class="ios-card text-center text-gray-500">No hay ventas cerradas.</div>';
                return;
            }
            container.innerHTML = sales.map(s => \`<div class="ios-card flex justify-between">
                <div><h3 class="font-bold text-gray-800 text-green-600">$\${s.total.toFixed(2)}</h3><p class="text-xs text-gray-500">ESTADO: \${s.status}</p></div>
            </div>\`).join('');
        }

        // --- GASTOS ---
        async function loadExpenses() {
            const container = document.getElementById('expensesList');
            const exp = await apiRequest('/expenses');
            if (!exp || exp.length === 0) {
                container.innerHTML = '<div class="ios-card text-center text-gray-500">No hay gastos.</div>';
                return;
            }
            container.innerHTML = exp.map(e => \`<div class="ios-card flex justify-between">
                <div><h3 class="font-bold text-gray-800">\${e.desc}</h3><p class="text-xs text-gray-500">\${e.category || 'General'}</p></div>
                <div class="text-red-500 font-bold">- $\${e.amount.toFixed(2)}</div>
            </div>\`).join('');
        }

        async function saveExpense() {
            const desc = document.getElementById('eDesc').value;
            const amount = parseFloat(document.getElementById('eAmount').value);
            if (!desc || !amount) return alert("Revisa los campos");
            const newExpense = { id: crypto.randomUUID(), desc, amount, category: 'Operativo', paymentMethod: 'Transfer', isSynced: true };
            await apiRequest('/expenses', 'POST', newExpense);
            hideModal('addExpenseModal');
            loadExpenses();
        }
    </script>
</body>
</html>`;
