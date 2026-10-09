import SwiftUI
import SwiftData

struct AddExpenseView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var desc = ""
    @State private var amount: Double = 0.0
    @State private var paymentMethod: PaymentMethod = .cash
    @State private var notes = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Detalle del Gasto") {
                    TextField("Descripción", text: $desc)
                    TextField("Monto", value: $amount, format: .currency(code: "MXN"))
                        .keyboardType(.decimalPad)
                }
                
                Section("Método de Pago") {
                    Picker("Método", selection: $paymentMethod) {
                        Text("Efectivo").tag(PaymentMethod.cash)
                        Text("Débito").tag(PaymentMethod.debit)
                        Text("Crédito").tag(PaymentMethod.credit)
                    }
                    .pickerStyle(.segmented)
                }
                
                Section("Opcional") {
                    TextField("Notas adicionales", text: $notes, axis: .vertical)
                        .lineLimit(3...6)
                }
            }
            .navigationTitle("Nuevo Gasto")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Guardar") {
                        let newExpense = Expense(
                            desc: desc,
                            amount: amount,
                            paymentMethod: paymentMethod,
                            notes: notes.isEmpty ? nil : notes,
                            isSynced: false
                        )
                        modelContext.insert(newExpense)
                        dismiss()
                    }
                    .disabled(desc.trimmingCharacters(in: .whitespaces).isEmpty || amount <= 0)
                }
            }
        }
    }
}
