export const HTML_CONTENT = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Altus MKT Premium</title>
    <meta name="theme-color" content="#1e293b">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/2953/2953330.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            background-color: #f8fafc; 
            padding-bottom: 90px;
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Animaciones */
        .fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        /* UI Components */
        .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.3); }
        .ios-card { background: #ffffff; border-radius: 20px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 16px; transition: transform 0.2s; border: 1px solid #f1f5f9; }
        .ios-card:active { transform: scale(0.98); }
        
        /* Botones */
        .btn-primary { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 16px 24px; border-radius: 16px; font-weight: 600; width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2); transition: all 0.2s; cursor: pointer; }
        .btn-primary:active { transform: scale(0.96); box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2); }
        
        /* Tab Bar */
        .tab-bar { position: fixed; bottom: 0; width: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid #e2e8f0; display: flex; justify-content: space-around; padding: 12px 10px 24px 10px; z-index: 40; }
        .tab-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #94a3b8; font-size: 0.65rem; font-weight: 600; cursor: pointer; transition: color 0.2s; width: 20%; text-transform: uppercase; letter-spacing: 0.5px; }
        .tab-btn.active { color: #2563eb; }
        .tab-icon { width: 24px; height: 24px; stroke-width: 2; transition: transform 0.2s; }
        .tab-btn.active .tab-icon { transform: translateY(-2px); stroke-width: 2.5; }
        
        /* Inputs */
        .ios-input { width: 100%; padding: 16px 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; font-size: 1rem; color: #1e293b; transition: all 0.2s; margin-bottom: 16px; }
        .ios-input:focus { outline: none; border-color: #3b82f6; background: #ffffff; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        
        /* Badges */
        .badge { padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-blue { background: #dbeafe; color: #1e40af; }
        .badge-orange { background: #ffedd5; color: #9a3412; }
    </style>
</head>
<body class="antialiased">

    <!-- Pantalla de Login -->
    <div id="loginScreen" class="min-h-screen flex flex-col items-center justify-center px-6 relative fade-in z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
        
        <div class="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 w-full max-w-md flex flex-col items-center relative z-10">
            <div class="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8">
                <img src="https://cdn-icons-png.flaticon.com/512/2953/2953330.png" class="w-16 h-16" alt="Altus">
            </div>
            
            <h1 class="text-3xl font-extrabold text-white mb-1 text-center">Altus MKT</h1>
            <p class="text-slate-300 font-medium mb-10 text-center">Agencia de Marketing Digital</p>
            
            <div class="w-full">
                <div class="relative mb-6">
                    <svg class="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <input type="password" id="pinInput" placeholder="Ingresa tu PIN" class="ios-input pl-12 !mb-0 text-center tracking-widest font-bold bg-white/20 text-white border-white/30 placeholder-slate-300 focus:bg-white/30 focus:border-white/50">
                </div>
                <p id="loginError" class="text-rose-400 text-sm text-center mb-4 font-medium hidden">PIN incorrecto.</p>
                <button onclick="login()" class="btn-primary !bg-white !text-slate-900 shadow-xl hover:bg-slate-50">
                    Ingresar
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Aplicación Principal -->
    <div id="appScreen" class="hidden">
        <!-- Header Premium -->
        <div class="bg-gradient-to-r from-slate-800 to-slate-900 text-white pt-14 pb-6 px-6 rounded-b-[2rem] shadow-xl sticky top-0 z-40 transition-colors duration-500" id="mainHeader">
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-white/60 text-xs font-bold uppercase tracking-wider mb-1" id="headerSubtitle">Resumen Operativo</p>
                    <h1 class="text-3xl font-extrabold tracking-tight" id="headerTitle">Dashboard</h1>
                </div>
                <button onclick="showModal('settingsModal')" class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition active:scale-95">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </button>
            </div>
        </div>

        <!-- CONTENIDO CENTRAL -->
        <div class="p-5 max-w-3xl mx-auto" id="mainContent">
            
            <!-- Vista Dashboard -->
            <div id="view-dashboard" class="view-section fade-in">
                <!-- Tarjetas de Resumen Financiero -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="ios-card !p-4 !mb-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/30">
                        <p class="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Ingresos Brutos</p>
                        <h3 class="text-2xl font-black" id="dashSales">$0.00</h3>
                    </div>
                    <div class="ios-card !p-4 !mb-0 bg-gradient-to-br from-rose-500 to-red-600 text-white border-0 shadow-lg shadow-rose-500/30">
                        <p class="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Gastos Operativos</p>
                        <h3 class="text-2xl font-black" id="dashExpenses">$0.00</h3>
                    </div>
                </div>
                <div class="ios-card bg-gradient-to-r from-slate-800 to-indigo-900 text-white border-0 shadow-lg shadow-indigo-900/20 mb-8">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Balance Neto</p>
                            <h3 class="text-3xl font-black text-emerald-400" id="dashBalance">$0.00</h3>
                        </div>
                        <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                </div>

                <h2 class="text-lg font-bold text-slate-800 mb-4">Acciones Rápidas</h2>
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="switchTab('quotes', 'Cotizaciones'); showModal('addQuoteModal')" class="ios-card !p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50">
                        <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></div>
                        <span class="text-sm font-bold text-slate-700">Cotizar</span>
                    </button>
                    <button onclick="switchTab('expenses', 'Gastos'); showModal('addExpenseModal')" class="ios-card !p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50">
                        <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></div>
                        <span class="text-sm font-bold text-slate-700">Registrar Gasto</span>
                    </button>
                </div>
            </div>

            <!-- Vista Clientes -->
            <div id="view-clients" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold text-slate-800">Directorio Activo</h2>
                    <button onclick="showModal('addClientModal')" class="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-200 transition">+ Añadir</button>
                </div>
                <div id="clientsList"></div>
            </div>

            <!-- Vista Cotizaciones -->
            <div id="view-quotes" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold text-slate-800">Pendientes</h2>
                    <button onclick="showModal('addQuoteModal')" class="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-200 transition">+ Crear</button>
                </div>
                <div id="quotesList"></div>
            </div>

            <!-- Vista Ventas -->
            <div id="view-sales" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold text-slate-800">Historial de Cobros</h2>
                    <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Actualizado</span>
                </div>
                <div id="salesList"></div>
            </div>

            <!-- Vista Gastos -->
            <div id="view-expenses" class="view-section hidden fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold text-slate-800">Egresos Operativos</h2>
                    <button onclick="showModal('addExpenseModal')" class="bg-rose-100 text-rose-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-rose-200 transition">+ Registrar</button>
                </div>
                <div id="expensesList"></div>
            </div>

        </div>

        <!-- Menú Inferior (Estilo Apple) -->
        <div class="tab-bar">
            <div class="tab-btn active" onclick="switchTab('dashboard', 'Dashboard')" id="tab-dashboard">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Inicio
            </div>
            <div class="tab-btn" onclick="switchTab('clients', 'Clientes')" id="tab-clients">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Clientes
            </div>
            <div class="tab-btn" onclick="switchTab('quotes', 'Cotizaciones')" id="tab-quotes">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Cotizar
            </div>
            <div class="tab-btn" onclick="switchTab('sales', 'Ventas')" id="tab-sales">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Ventas
            </div>
            <div class="tab-btn" onclick="switchTab('expenses', 'Gastos')" id="tab-expenses">
                <svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                Gastos
            </div>
        </div>
        
        <!-- === MODALES PREMIUM === -->

        <!-- Modal Configuración -->
        <div id="settingsModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center z-50">
            <div class="bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 pb-12 slide-up shadow-2xl">
                <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-2xl font-extrabold text-slate-800">Configuración</h3>
                    <button onclick="hideModal('settingsModal')" class="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold hover:bg-slate-200 transition">&times;</button>
                </div>
                
                <div class="ios-card flex items-center gap-4 border-2 border-indigo-50 !mb-8">
                    <img src="https://cdn-icons-png.flaticon.com/512/2953/2953330.png" class="w-16 h-16" alt="Logo">
                    <div>
                        <h4 class="font-bold text-slate-800 text-lg">Altus MKT</h4>
                        <p class="text-sm text-slate-500">Administrador Web</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <button onclick="logout()" class="btn-primary !bg-gradient-to-r !from-rose-500 !to-red-600 !shadow-rose-500/20">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Cerrar Sesión Segura
                    </button>
                    <p class="text-center text-slate-400 text-xs mt-4">Altus MKT v2.0 Web Build</p>
                </div>
            </div>
        </div>

        <!-- Modal Cliente -->
        <div id="addClientModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center z-50">
            <div class="bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 pb-12 slide-up shadow-2xl">
                <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-2xl font-extrabold text-slate-800">Nuevo Cliente</h3>
                    <button onclick="hideModal('addClientModal')" class="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold hover:bg-slate-200 transition">&times;</button>
                </div>
                <div class="space-y-4">
                    <input type="text" id="cName" placeholder="Nombre de la empresa" class="ios-input">
                    <input type="tel" id="cPhone" placeholder="Teléfono" class="ios-input">
                    <input type="email" id="cEmail" placeholder="Correo electrónico" class="ios-input">
                    <button onclick="saveClient()" class="btn-primary mt-2">Guardar Cliente</button>
                </div>
            </div>
        </div>

        <!-- Modal Gasto -->
        <div id="addExpenseModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center z-50">
            <div class="bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 pb-12 slide-up shadow-2xl">
                <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-2xl font-extrabold text-slate-800">Registrar Gasto</h3>
                    <button onclick="hideModal('addExpenseModal')" class="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold hover:bg-slate-200 transition">&times;</button>
                </div>
                <div class="space-y-4">
                    <input type="text" id="eDesc" placeholder="Concepto del gasto (ej. Facebook Ads)" class="ios-input">
                    <div class="relative">
                        <span class="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input type="number" id="eAmount" placeholder="0.00" class="ios-input pl-10">
                    </div>
                    <button onclick="saveExpense()" class="btn-primary mt-2 !bg-gradient-to-r !from-rose-500 !to-red-600 !shadow-rose-500/20">Registrar Salida</button>
                </div>
            </div>
        </div>

        <!-- Modal Cotización -->
        <div id="addQuoteModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center z-50">
            <div class="bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 pb-12 slide-up shadow-2xl">
                <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-2xl font-extrabold text-slate-800">Generar Cotización</h3>
                    <button onclick="hideModal('addQuoteModal')" class="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center font-bold hover:bg-slate-200 transition">&times;</button>
                </div>
                <div class="space-y-4">
                    <input type="text" id="qDesc" placeholder="Concepto (ej. Campaña Mensual)" class="ios-input">
                    <div class="relative">
                        <span class="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input type="number" id="qTotal" placeholder="Monto total a cobrar" class="ios-input pl-10">
                    </div>
                    <button onclick="saveQuote()" class="btn-primary mt-2 !bg-gradient-to-r !from-indigo-500 !to-purple-600 !shadow-indigo-500/20">Generar Documento</button>
                </div>
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

            const header = document.getElementById('mainHeader');
            header.className = 'text-white pt-14 pb-6 px-6 rounded-b-[2rem] shadow-xl sticky top-0 z-40 transition-colors duration-500 ';
            
            let subtitle = "Operación Diaria";
            if(tab === 'dashboard') { header.className += 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-slate-900/20'; subtitle = "Resumen Financiero"; }
            if(tab === 'clients') { header.className += 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-blue-900/10'; subtitle = "Directorio"; }
            if(tab === 'quotes') { header.className += 'bg-gradient-to-r from-indigo-600 to-purple-700 shadow-indigo-900/10'; subtitle = "Pendientes"; }
            if(tab === 'sales') { header.className += 'bg-gradient-to-r from-emerald-500 to-teal-700 shadow-emerald-900/10'; subtitle = "Ingresos Realizados"; }
            if(tab === 'expenses') { header.className += 'bg-gradient-to-r from-rose-500 to-red-700 shadow-rose-900/10'; subtitle = "Egresos Registrados"; }
            
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

        const emptyState = (icon, title, subtitle) => \`
            <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4">\${icon}</div>
                <h3 class="text-lg font-bold text-slate-800 mb-1">\${title}</h3>
                <p class="text-slate-500 text-sm max-w-[200px] mx-auto">\${subtitle}</p>
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
            
            const balEl = document.getElementById('dashBalance');
            balEl.innerText = '$' + balance.toLocaleString('es-MX', {minimumFractionDigits: 2});
            balEl.className = \`text-3xl font-black \${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}\`;
        }

        // --- CLIENTES ---
        async function loadClients() {
            const container = document.getElementById('clientsList');
            container.innerHTML = '<div class="text-center text-slate-400 py-10 font-medium">Sincronizando...</div>';
            const clients = await apiRequest('/clients');
            if (!clients || clients.length === 0) {
                container.innerHTML = emptyState('👥', 'Sin Clientes', 'Agrega tu primer cliente para empezar.');
                return;
            }
            container.innerHTML = clients.map(c => \`
            <div class="ios-card flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-200 shadow-sm shrink-0">
                    \${c.name.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-slate-800 text-base truncate">\${c.name}</h3>
                    <p class="text-sm text-slate-500 truncate">\${c.phone || 'Sin teléfono'}</p>
                </div>
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
            container.innerHTML = '<div class="text-center text-slate-400 py-10 font-medium">Sincronizando...</div>';
            const quotes = await apiRequest('/quotes');
            if (!quotes || quotes.length === 0) {
                container.innerHTML = emptyState('📄', 'Sin Cotizaciones', 'Crea una cotización para enviarla a tu cliente.');
                return;
            }
            container.innerHTML = quotes.map(q => \`
            <div class="ios-card">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="badge \${q.status === 'Sent' ? 'badge-blue' : 'badge-orange'} mb-2 inline-block">\${q.status}</span>
                        <h3 class="font-extrabold text-slate-800 text-xl">$\${q.total.toLocaleString('es-MX', {minimumFractionDigits: 2})}</h3>
                    </div>
                </div>
                <div class="pt-3 border-t border-slate-100 flex gap-2">
                    <button onclick="approveQuote('\${q.id}', \${q.total})" class="flex-1 bg-green-50 text-green-700 py-2 rounded-xl text-sm font-bold hover:bg-green-100 transition">✅ Cerrar Venta</button>
                </div>
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
            if(!confirm('¡Felicidades! ¿Convertir en venta y cobrar?')) return;
            const newSale = { id: crypto.randomUUID(), total, status: 'In Process', isSynced: true };
            await apiRequest('/sales', 'POST', newSale);
            switchTab('sales', 'Ventas');
        }

        async function loadSales() {
            const container = document.getElementById('salesList');
            container.innerHTML = '<div class="text-center text-slate-400 py-10 font-medium">Sincronizando...</div>';
            const sales = await apiRequest('/sales');
            if (!sales || sales.length === 0) {
                container.innerHTML = emptyState('💰', 'Sin Ventas', 'Aprueba cotizaciones para generar cobros.');
                return;
            }
            container.innerHTML = sales.map(s => \`
            <div class="ios-card flex justify-between items-center bg-gradient-to-r from-white to-emerald-50/30">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <p class="text-xs text-slate-400 font-bold mb-0.5 uppercase">\${s.status}</p>
                        <h3 class="font-black text-slate-800 text-lg">$\${s.total.toLocaleString('es-MX', {minimumFractionDigits: 2})}</h3>
                    </div>
                </div>
            </div>\`).join('');
        }

        // --- GASTOS ---
        async function loadExpenses() {
            const container = document.getElementById('expensesList');
            container.innerHTML = '<div class="text-center text-slate-400 py-10 font-medium">Sincronizando...</div>';
            const exp = await apiRequest('/expenses');
            if (!exp || exp.length === 0) {
                container.innerHTML = emptyState('📉', 'Sin Gastos', 'Registra tus salidas operativas aquí.');
                return;
            }
            container.innerHTML = exp.map(e => \`
            <div class="ios-card flex justify-between items-center border-l-4 border-l-rose-500">
                <div>
                    <h3 class="font-bold text-slate-800 text-base">\${e.desc}</h3>
                    <p class="text-xs text-slate-400 font-medium">\${e.category || 'Gasto Operativo'}</p>
                </div>
                <div class="text-rose-600 font-extrabold bg-rose-50 px-3 py-1.5 rounded-lg">
                    -$\${e.amount.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                </div>
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
