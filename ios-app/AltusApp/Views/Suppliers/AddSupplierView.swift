import SwiftUI
import SwiftData

struct AddSupplierView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    @State private var name = ""
    @State private var contactInfo = ""
    @State private var initialDebt: Double = 0.0
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Datos del Proveedor") {
                    TextField("Nombre o Empresa", text: $name)
                    TextField("Contacto (Tel/Email)", text: $contactInfo)
                }
                
                Section("Estado de Cuenta") {
                    TextField("Deuda Actual Inicial", value: $initialDebt, format: .currency(code: "MXN"))
                        .keyboardType(.decimalPad)
                }
            }
            .navigationTitle("Nuevo Proveedor")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Guardar") {
                        let newSupplier = Supplier(
                            name: name,
                            contactInfo: contactInfo.isEmpty ? nil : contactInfo,
                            initialDebt: initialDebt,
                            isSynced: false
                        )
                        modelContext.insert(newSupplier)
                        dismiss()
                    }
                    .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
        }
    }
}
