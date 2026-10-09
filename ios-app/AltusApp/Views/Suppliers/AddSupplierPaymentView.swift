import SwiftUI
import SwiftData

struct AddSupplierPaymentView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    var supplier: Supplier
    
    @State private var amount: Double = 0.0
    @State private var desc = ""
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Saldo a Pagar") {
                    HStack {
                        Text("Deuda Actual")
                        Spacer()
                        Text(supplier.currentBalance, format: .currency(code: "MXN"))
                            .bold()
                            .foregroundColor(.red)
                    }
                }
                
                Section("Registrar Abono/Pago") {
                    TextField("Monto a pagar", value: $amount, format: .currency(code: "MXN"))
                        .keyboardType(.decimalPad)
                        .onAppear {
                            amount = supplier.currentBalance
                        }
                    
                    TextField("Descripción o Referencia", text: $desc)
                }
            }
            .navigationTitle("Pagar a Proveedor")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Registrar Pago") {
                        let payment = SupplierPayment(
                            amount: amount,
                            desc: desc.isEmpty ? nil : desc,
                            isSynced: false
                        )
                        payment.supplier = supplier
                        modelContext.insert(payment)
                        dismiss()
                    }
                    .disabled(amount <= 0 || amount > supplier.currentBalance)
                }
            }
        }
    }
}
