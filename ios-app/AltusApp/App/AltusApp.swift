import SwiftUI
import SwiftData

@main
struct AltusApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Client.self,
            Expense.self,
            Quote.self,
            OrderSale.self,
            Payment.self,
            Supplier.self,
            SupplierPayment.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    @AppStorage("isLoggedIn") private var isLoggedIn = false

    var body: some Scene {
        WindowGroup {
            if isLoggedIn {
                ContentView()
            } else {
                LoginView()
            }
        }
        .modelContainer(sharedModelContainer)
    }
}

// Vista principal con TabBar
struct ContentView: View {
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        TabView {
            ClientListView()
                .tabItem { Label("Clientes", systemImage: "person.3") }
            
            QuoteListView()
                .tabItem { Label("Cotizaciones", systemImage: "doc.text") }
            
            OrderSaleListView()
                .tabItem { Label("Ventas", systemImage: "cart.fill") }
            
            SupplierListView()
                .tabItem { Label("Proveedores", systemImage: "shippingbox") }
            
            ExpenseListView()
                .tabItem { Label("Gastos", systemImage: "creditcard") }
                
            DashboardView() // La crearemos a continuación
                .tabItem { Label("Métricas", systemImage: "chart.bar.xaxis") }
        }
        .onAppear {
            // Inicializar y disparar la sincronización al abrir la app
            SyncManager.shared.setup(context: modelContext)
            
            Task {
                await SyncManager.shared.syncUnsavedData()
            }
        }
    }
}
