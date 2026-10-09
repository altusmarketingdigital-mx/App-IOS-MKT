import SwiftUI
import SwiftData

struct AddQuoteView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    @Query(sort: \Client.name) private var clients: [Client]
    
    @State private var selectedClient: Client?
    @State private var subtotal: Double = 0.0
    @State private var taxRate: Double = 0.16 // 16% IVA por defecto
    
    var taxes: Double { subtotal * taxRate }
    var total: Double { subtotal + taxes }
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Cliente") {
                    if clients.isEmpty {
                        Text("No hay clientes registrados. Agrega uno primero.")
                            .foregroundColor(.red)
                    } else {
                        Picker("Seleccionar Cliente", selection: $selectedClient) {
                            Text("Ninguno").tag(Client?.none)
                            ForEach(clients) { client in
                                Text(client.name).tag(Client?.some(client))
                            }
                        }
                    }
                }
                
                Section("Montos") {
                    TextField("Subtotal", value: $subtotal, format: .currency(code: "MXN"))
                        .keyboardType(.decimalPad)
                    
                    HStack {
                        Text("Impuestos (IVA)")
                        Spacer()
                        Text(taxes, format: .currency(code: "MXN"))
                            .foregroundColor(.secondary)
                    }
                    
                    HStack {
                        Text("Total")
                            .bold()
                        Spacer()
                        Text(total, format: .currency(code: "MXN"))
                            .bold()
                            .foregroundColor(.blue)
                    }
                }
            }
            .navigationTitle("Nueva Cotización")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Guardar") {
                        if let client = selectedClient {
                            let newQuote = Quote(
                                subtotal: subtotal,
                                taxes: taxes,
                                total: total,
                                isSynced: false
                            )
                            newQuote.client = client
                            modelContext.insert(newQuote)
                            dismiss()
                        }
                    }
                    .disabled(selectedClient == nil || subtotal <= 0)
                }
            }
        }
    }
}
