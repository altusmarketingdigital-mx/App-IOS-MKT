export const HTML_CONTENT = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Altus MKT | Portal Operativo</title>
    <meta name="theme-color" content="#152336">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/2953/2953330.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
            --brand-navy: #152336;
            --brand-accent: #d9664c;
        }

        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #fafafa; 
            color: #152336;
            padding-bottom: 90px;
            -webkit-tap-highlight-color: transparent;
        }

        /* Minimalist Animations */
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* Minimalist UI Components */
        .card { 
            background: #ffffff; 
            border-radius: 12px; 
            padding: 24px; 
            border: 1px solid #eaeaea; 
            margin-bottom: 16px; 
            transition: border-color 0.2s ease;
        }
        
        /* Buttons */
        .btn-brand { 
            background-color: var(--brand-accent); 
            color: #ffffff; 
            padding: 14px 24px; 
            border-radius: 8px; 
            font-weight: 600; 
            width: 100%; 
            text-align: center; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 8px; 
            transition: opacity 0.2s ease; 
        }
        .btn-brand:active { opacity: 0.8; }
        
        .btn-dark { 
            background-color: var(--brand-navy); 
            color: #ffffff; 
            padding: 14px 24px; 
            border-radius: 8px; 
            font-weight: 600; 
            width: 100%; 
            text-align: center; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 8px; 
            transition: opacity 0.2s ease; 
        }
        .btn-dark:active { opacity: 0.8; }

        .btn-outline {
            background-color: transparent;
            border: 1px solid #e5e5e5;
            color: var(--brand-navy);
            padding: 14px 24px;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
        }

        /* Inputs */
        .input-clean { 
            width: 100%; 
            padding: 14px 0; 
            background: transparent; 
            border: none; 
            border-bottom: 1px solid #e5e5e5; 
            font-size: 1rem; 
            color: var(--brand-navy); 
            border-radius: 0;
            transition: border-color 0.3s ease; 
            margin-bottom: 24px; 
        }
        .input-clean:focus { 
            outline: none; 
            border-bottom-color: var(--brand-accent); 
        }

        /* Tab Bar */
        .tab-bar { 
            position: fixed; 
            bottom: 0; 
            width: 100%; 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px); 
            -webkit-backdrop-filter: blur(10px); 
            border-top: 1px solid #f0f0f0; 
            display: flex; 
            justify-content: space-around; 
            padding: 16px 10px 28px 10px; 
            z-index: 40; 
        }
        .tab-btn { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 6px; 
            color: #a3a3a3; 
            font-size: 0.65rem; 
            font-weight: 600; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: color 0.3s; 
            width: 20%; 
        }
        .tab-btn.active { color: var(--brand-navy); }
        .tab-icon { width: 22px; height: 22px; stroke-width: 1.5; }
        .tab-btn.active .tab-icon { stroke-width: 2; color: var(--brand-accent); }
        
        /* Badges */
        .status-badge { 
            font-size: 0.7rem; 
            text-transform: uppercase; 
            letter-spacing: 1px; 
            font-weight: 600; 
            color: var(--brand-accent);
        }

        /* Login Background to match the logo edges perfectly */
        .bg-brand-navy { background-color: #161e2c; } 
    </style>
</head>
<body class="antialiased">

    <!-- Pantalla de Login -->
    <div id="loginScreen" class="min-h-screen flex flex-col items-center justify-center px-8 bg-brand-navy z-50 relative fade-in">
        <div class="w-full max-w-sm flex flex-col items-center">
            
            <!-- Logotipo Incrustado Base64 -->
            <img src="data:image/jpeg;base64,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" alt="Altus Logo" class="w-32 h-auto mb-4 object-contain">
            <h1 class="text-xl font-bold tracking-widest text-white mb-10 uppercase text-center opacity-90">Private Access</h1>
            
            <div class="w-full">
                <input type="password" id="pinInput" placeholder="Enter PIN" class="input-clean text-center tracking-[0.5em] text-lg font-light border-white/20 text-white focus:border-brand-accent">
                <p id="loginError" class="text-brand-accent text-xs text-center mb-8 uppercase tracking-wide font-bold hidden">Access Denied</p>
                <button onclick="login()" class="btn-brand">
                    Authenticate
                </button>
            </div>
        </div>
    </div>

    <!-- Aplicación Principal -->
    <div id="appScreen" class="hidden">
        
        <!-- Header Minimalista -->
        <div class="bg-white/90 backdrop-blur-md pt-16 pb-6 px-6 border-b border-neutral-100 sticky top-0 z-40" id="mainHeader">
            <div class="flex justify-between items-end">
                <div class="flex items-center gap-3">
                    <img src="data:image/jpeg;base64,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" class="w-10 h-10 rounded-lg object-contain shadow-sm border border-neutral-100" alt="Altus Logo">
                    <div>
                        <p class="text-neutral-400 text-[0.65rem] font-bold uppercase tracking-widest mb-0.5" id="headerSubtitle">Overview</p>
                        <h1 class="text-2xl font-light tracking-tight text-brand-navy" id="headerTitle">Dashboard</h1>
                    </div>
                </div>
                <button onclick="showModal('settingsModal')" class="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-brand-navy transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </button>
            </div>
        </div>

        <!-- CONTENIDO CENTRAL -->
        <div class="p-6 max-w-3xl mx-auto" id="mainContent">
            
            <!-- Vista Dashboard -->
            <div id="view-dashboard" class="view-section fade-in">
                
                <div class="mb-10">
                    <p class="text-xs text-neutral-400 uppercase tracking-widest mb-2">Net Balance</p>
                    <h3 class="text-5xl font-light text-neutral-900 tracking-tight" id="dashBalance">$0.00</h3>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-10">
                    <div class="card !mb-0 !p-5 bg-neutral-50 border-none">
                        <p class="text-neutral-500 text-xs uppercase tracking-widest mb-2">Inflow</p>
                        <h3 class="text-2xl font-light text-neutral-900" id="dashSales">$0.00</h3>
                    </div>
                    <div class="card !mb-0 !p-5 bg-neutral-50 border-none">
                        <p class="text-neutral-500 text-xs uppercase tracking-widest mb-2">Outflow</p>
                        <h3 class="text-2xl font-light text-neutral-900" id="dashExpenses">$0.00</h3>
                    </div>
                </div>

                <p class="text-xs text-neutral-400 uppercase tracking-widest mb-4">Quick Actions</p>
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="switchTab('quotes', 'Proposals'); showModal('addQuoteModal')" class="btn-outline flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"></path></svg>
                        Proposal
                    </button>
                    <button onclick="switchTab('expenses', 'Expenses'); showModal('addExpenseModal')" class="btn-outline flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4"></path></svg>
                        Expense
                    </button>
                </div>
            </div>

            <!-- Vista Clientes -->
            <div id="view-clients" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-xs text-neutral-400 uppercase tracking-widest">Directory</p>
                    <button onclick="showModal('addClientModal')" class="text-neutral-900 text-sm font-medium hover:underline">+ Add Client</button>
                </div>
                <div id="clientsList"></div>
            </div>

            <!-- Vista Cotizaciones -->
            <div id="view-quotes" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-xs text-neutral-400 uppercase tracking-widest">Active Proposals</p>
                    <button onclick="showModal('addQuoteModal')" class="text-neutral-900 text-sm font-medium hover:underline">+ New Proposal</button>
                </div>
                <div id="quotesList"></div>
            </div>

            <!-- Vista Ventas -->
            <div id="view-sales" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-xs text-neutral-400 uppercase tracking-widest">Revenue</p>
                </div>
                <div id="salesList"></div>
            </div>

            <!-- Vista Gastos -->
            <div id="view-expenses" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-xs text-neutral-400 uppercase tracking-widest">Operational Costs</p>
                    <button onclick="showModal('addExpenseModal')" class="text-neutral-900 text-sm font-medium hover:underline">+ Log Expense</button>
                </div>
                <div id="expensesList"></div>
            </div>

        </div>

        <!-- Menú Inferior Elegante -->
        <div class="tab-bar">
            <div class="tab-btn active" onclick="switchTab('dashboard', 'Dashboard')" id="tab-dashboard">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Overview
            </div>
            <div class="tab-btn" onclick="switchTab('clients', 'Clients')" id="tab-clients">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Clients
            </div>
            <div class="tab-btn" onclick="switchTab('quotes', 'Proposals')" id="tab-quotes">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Proposals
            </div>
            <div class="tab-btn" onclick="switchTab('sales', 'Revenue')" id="tab-sales">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Revenue
            </div>
            <div class="tab-btn" onclick="switchTab('expenses', 'Expenses')" id="tab-expenses">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"></path></svg>
                Expenses
            </div>
        </div>
        
        <!-- === MODALES MINIMALISTAS === -->
        <div id="settingsModal" class="hidden fixed inset-0 bg-white z-50 overflow-y-auto">
            <div class="p-8">
                <div class="flex justify-between items-center mb-16">
                    <h3 class="text-2xl font-light text-neutral-900 tracking-tight">Settings</h3>
                    <button onclick="hideModal('settingsModal')" class="text-neutral-400 hover:text-neutral-900">&times; Close</button>
                </div>
                
                <div class="mb-12">
                    <h4 class="font-medium text-neutral-900 text-lg">ALTUS MKT</h4>
                    <p class="text-sm text-neutral-500">Workspace Administrator</p>
                </div>

                <div class="space-y-4 pt-8 border-t border-neutral-100">
                    <button onclick="logout()" class="text-red-500 font-medium hover:opacity-70 transition text-left">
                        Sign Out
                    </button>
                    <p class="text-neutral-300 text-xs pt-10">Altus MKT System v3.0 - Elegant Web Build</p>
                </div>
            </div>
        </div>

        <!-- Modales de Entidades -->
        <div id="addClientModal" class="hidden fixed inset-0 bg-white z-50">
            <div class="p-8 h-full flex flex-col">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-2xl font-light tracking-tight">New Client</h3>
                    <button onclick="hideModal('addClientModal')" class="text-neutral-400">Cancel</button>
                </div>
                <div class="flex-1">
                    <input type="text" id="cName" placeholder="Company Name" class="input-clean">
                    <input type="tel" id="cPhone" placeholder="Phone Number" class="input-clean">
                    <input type="email" id="cEmail" placeholder="Email Address" class="input-clean">
                </div>
                <button onclick="saveClient()" class="btn-dark mb-8">Save Client</button>
            </div>
        </div>

        <div id="addExpenseModal" class="hidden fixed inset-0 bg-white z-50">
            <div class="p-8 h-full flex flex-col">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-2xl font-light tracking-tight">Log Expense</h3>
                    <button onclick="hideModal('addExpenseModal')" class="text-neutral-400">Cancel</button>
                </div>
                <div class="flex-1">
                    <input type="text" id="eDesc" placeholder="Description (e.g. Server costs)" class="input-clean">
                    <input type="number" id="eAmount" placeholder="Amount (MXN)" class="input-clean">
                </div>
                <button onclick="saveExpense()" class="btn-dark mb-8">Record Expense</button>
            </div>
        </div>

        <div id="addQuoteModal" class="hidden fixed inset-0 bg-white z-50">
            <div class="p-8 h-full flex flex-col">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-2xl font-light tracking-tight">New Proposal</h3>
                    <button onclick="hideModal('addQuoteModal')" class="text-neutral-400">Cancel</button>
                </div>
                <div class="flex-1">
                    <input type="text" id="qDesc" placeholder="Project / Service" class="input-clean">
                    <input type="number" id="qTotal" placeholder="Total Amount" class="input-clean">
                </div>
                <button onclick="saveQuote()" class="btn-dark mb-8">Generate Proposal</button>
            </div>
        </div>

    </div>

    <!-- Scripts -->
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
        
        function logout() {
            localStorage.removeItem('altus_api_key');
            location.reload();
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
                return null;
            }
        }

        function switchTab(tab, title) {
            document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById('view-' + tab).classList.remove('hidden');
            document.getElementById('tab-' + tab).classList.add('active');
            document.getElementById('headerTitle').innerText = title;

            let subtitle = "Directory";
            if(tab === 'dashboard') { subtitle = "Overview"; }
            if(tab === 'clients') { subtitle = "Directory"; }
            if(tab === 'quotes') { subtitle = "Proposals"; }
            if(tab === 'sales') { subtitle = "Revenue"; }
            if(tab === 'expenses') { subtitle = "Outflow"; }
            
            document.getElementById('headerSubtitle').innerText = subtitle;

            if(tab === 'dashboard') updateDashboard();
            if(tab === 'clients') loadClients();
            if(tab === 'quotes') loadQuotes();
            if(tab === 'sales') loadSales();
            if(tab === 'expenses') loadExpenses();
        }

        function showModal(id) { document.getElementById(id).classList.remove('hidden'); }
        function hideModal(id) { document.getElementById(id).classList.add('hidden'); }

        async function loadAllData() { 
            loadClients();
            updateDashboard();
        }

        const emptyState = (title, subtitle) => \`
            <div class="py-16 text-center border border-dashed border-neutral-200 rounded-xl mt-4">
                <h3 class="text-sm font-medium text-neutral-900 mb-1">\${title}</h3>
                <p class="text-neutral-400 text-xs">\${subtitle}</p>
            </div>
        \`;

        // --- DASHBOARD ---
        async function updateDashboard() {
            const sales = await apiRequest('/sales') || [];
            const expenses = await apiRequest('/expenses') || [];
            
            const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
            const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
            const balance = totalSales - totalExp;

            document.getElementById('dashSales').innerText = '$' + totalSales.toLocaleString('es-MX', {minimumFractionDigits: 2});
            document.getElementById('dashExpenses').innerText = '$' + totalExp.toLocaleString('es-MX', {minimumFractionDigits: 2});
            
            document.getElementById('dashBalance').innerText = '$' + balance.toLocaleString('es-MX', {minimumFractionDigits: 2});
        }

        // --- CLIENTES ---
        async function loadClients() {
            const container = document.getElementById('clientsList');
            const clients = await apiRequest('/clients');
            if (!clients || clients.length === 0) {
                container.innerHTML = emptyState('No clients found', 'Your directory is currently empty.');
                return;
            }
            container.innerHTML = clients.map(c => \`
            <div class="card flex items-center justify-between">
                <div>
                    <h3 class="font-medium text-neutral-900">\${c.name}</h3>
                    <p class="text-xs text-neutral-400 mt-1">\${c.phone || 'No phone'}</p>
                </div>
            </div>\`).join('');
        }

        async function saveClient() {
            const name = document.getElementById('cName').value;
            if (!name) return alert("Required field missing");
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
                container.innerHTML = emptyState('No proposals', 'Create your first proposal.');
                return;
            }
            container.innerHTML = quotes.map(q => \`
            <div class="card">
                <div class="flex justify-between items-center mb-6">
                    <span class="status-badge">\${q.status}</span>
                    <h3 class="font-light text-2xl text-neutral-900">$\${q.total.toLocaleString('es-MX', {minimumFractionDigits: 2})}</h3>
                </div>
                <button onclick="approveQuote('\${q.id}', \${q.total})" class="w-full bg-neutral-100 text-neutral-900 py-3 rounded-lg text-sm font-medium hover:bg-neutral-200 transition">Mark as Won</button>
            </div>\`).join('');
        }

        async function saveQuote() {
            const total = parseFloat(document.getElementById('qTotal').value);
            if (!total) return alert("Invalid amount");
            const newQuote = { id: crypto.randomUUID(), total, status: 'Pending', isSynced: true };
            await apiRequest('/quotes', 'POST', newQuote);
            hideModal('addQuoteModal');
            loadQuotes();
        }

        // --- VENTAS ---
        async function approveQuote(quoteId, total) {
            if(!confirm('Convert proposal to revenue?')) return;
            const newSale = { id: crypto.randomUUID(), total, status: 'Closed', isSynced: true };
            await apiRequest('/sales', 'POST', newSale);
            switchTab('sales', 'Revenue');
        }

        async function loadSales() {
            const container = document.getElementById('salesList');
            const sales = await apiRequest('/sales');
            if (!sales || sales.length === 0) {
                container.innerHTML = emptyState('No revenue', 'Won proposals will appear here.');
                return;
            }
            container.innerHTML = sales.map(s => \`
            <div class="card flex justify-between items-center">
                <span class="status-badge">\${s.status}</span>
                <h3 class="font-light text-xl text-neutral-900">$\${s.total.toLocaleString('es-MX', {minimumFractionDigits: 2})}</h3>
            </div>\`).join('');
        }

        // --- GASTOS ---
        async function loadExpenses() {
            const container = document.getElementById('expensesList');
            const exp = await apiRequest('/expenses');
            if (!exp || exp.length === 0) {
                container.innerHTML = emptyState('No expenses', 'Your operational costs are clean.');
                return;
            }
            container.innerHTML = exp.map(e => \`
            <div class="card flex justify-between items-center">
                <div>
                    <h3 class="font-medium text-neutral-900">\${e.desc}</h3>
                    <p class="text-xs text-neutral-400 mt-1">\${e.category || 'Operational'}</p>
                </div>
                <div class="text-neutral-900 font-light text-lg">
                    $\${e.amount.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                </div>
            </div>\`).join('');
        }

        async function saveExpense() {
            const desc = document.getElementById('eDesc').value;
            const amount = parseFloat(document.getElementById('eAmount').value);
            if (!desc || !amount) return alert("Check inputs");
            const newExpense = { id: crypto.randomUUID(), desc, amount, category: 'Operational', paymentMethod: 'Transfer', isSynced: true };
            await apiRequest('/expenses', 'POST', newExpense);
            hideModal('addExpenseModal');
            loadExpenses();
        }
    </script>
</body>
</html>`;
