import Foundation
import SwiftData

@MainActor
class SyncManager {
    static let shared = SyncManager()
    private var modelContext: ModelContext?

    func setup(context: ModelContext) {
        self.modelContext = context
    }

    /// Busca en la base de datos local (SwiftData) registros que no se han subido al backend
    func syncUnsavedData() async {
        guard let context = modelContext else { return }
        
        await syncClients(context: context)
        await syncExpenses(context: context)
        
        do {
            try context.save()
            print("✅ Sincronización finalizada correctamente.")
        } catch {
            print("❌ Error guardando el contexto tras sincronizar: \(error)")
        }
    }
    
    private func syncClients(context: ModelContext) async {
        let descriptor = FetchDescriptor<Client>(predicate: #Predicate { $0.isSynced == false })
        do {
            let unsynced = try context.fetch(descriptor)
            for client in unsynced {
                do {
                    try await APIManager.shared.postClient(client)
                    client.isSynced = true // Marcamos como subido
                } catch {
                    print("⚠️ No se pudo subir el cliente \(client.name)")
                }
            }
        } catch {
            print("Error leyendo clientes: \(error)")
        }
    }
    
    private func syncExpenses(context: ModelContext) async {
        let descriptor = FetchDescriptor<Expense>(predicate: #Predicate { $0.isSynced == false })
        do {
            let unsynced = try context.fetch(descriptor)
            for expense in unsynced {
                do {
                    try await APIManager.shared.postExpense(expense)
                    expense.isSynced = true // Marcamos como subido
                } catch {
                    print("⚠️ No se pudo subir el gasto \(expense.desc)")
                }
            }
        } catch {
            print("Error leyendo gastos: \(error)")
        }
    }
}
