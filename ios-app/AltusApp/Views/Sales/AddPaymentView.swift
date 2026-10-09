import SwiftUI
import SwiftData

struct AddPaymentView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    var orderSale: OrderSale
    
    @State private var amount: Double = 0.0
    @State private var paymentMethod: PaymentMethod = .cash
    
    var balance: Double {
        let paid = orderSale.payments?.reduce(0) { $0 + $1.amount } ?? 0
        return orderSale.total - paid
    }
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Saldo de Venta") {
                    HStack {
                        Text("Total Venta")
                        Spacer()
                        Text(orderSale.total, format: .currency(code: "MXN"))
                    }
                    HStack {
                        Text("Por Pagar")
                            .bold()
                        Spacer()
                        Text(balance, format: .currency(code: "MXN"))
                            .foregroundColor(.red)
                    }
                }
                
                Section("Registrar Abono") {
                    TextField("Monto", value: $amount, format: .currency(code: "MXN"))
                        .keyboardType(.decimalPad)
                        .onAppear {
                            amount = balance // Sugerir pagar el total restante
                        }
                    
                    Picker("Método de Pago", selection: $paymentMethod) {
                        Text("Efectivo").tag(PaymentMethod.cash)
                        Text("Débito").tag(PaymentMethod.debit)
                        Text("Crédito").tag(PaymentMethod.credit)
                    }
                    .pickerStyle(.segmented)
                }
            }
            .navigationTitle("Abonar a Venta")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Guardar") {
                        let newPayment = Payment(
                            amount: amount,
                            paymentMethod: paymentMethod.rawValue,
                            isSynced: false
                        )
                        newPayment.order = orderSale
                        modelContext.insert(newPayment)
                        
                        // Si ya se pagó todo y estaba pendiente, pasar a "In Process" o "Delivered"
                        if balance - amount <= 0 && orderSale.status == "Pending" {
                            orderSale.status = "In Process"
                        }
                        
                        try? modelContext.save()
                        dismiss()
                    }
                    .disabled(amount <= 0 || amount > balance)
                }
            }
        }
    }
}
