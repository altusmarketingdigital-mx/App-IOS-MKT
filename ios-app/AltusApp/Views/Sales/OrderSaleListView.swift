import SwiftUI
import SwiftData

struct OrderSaleListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \OrderSale.createdAt, order: .reverse) private var sales: [OrderSale]
    @State private var showingAddPaymentFor: OrderSale?

    var body: some View {
        NavigationStack {
            List {
                ForEach(sales) { sale in
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(sale.client?.name ?? "Cliente Desconocido")
                                .font(.headline)
                            Spacer()
                            Text(sale.status)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(statusColor(for: sale.status).opacity(0.2))
                                .cornerRadius(8)
                        }
                        
                        let paid = sale.payments?.reduce(0) { $0 + $1.amount } ?? 0
                        let balance = sale.total - paid
                        
                        HStack {
                            Text("Total: \(sale.total, format: .currency(code: "MXN"))")
                            Spacer()
                            if balance > 0 {
                                Text("Resta: \(balance, format: .currency(code: "MXN"))")
                                    .foregroundColor(.red)
                            } else {
                                Text("Pagado")
                                    .foregroundColor(.green)
                            }
                        }
                        .font(.subheadline)
                    }
                    .swipeActions(edge: .leading) {
                        if (sale.total - (sale.payments?.reduce(0) { $0 + $1.amount } ?? 0)) > 0 {
                            Button {
                                showingAddPaymentFor = sale
                            } label: {
                                Label("Abonar", systemImage: "dollarsign.circle")
                            }
                            .tint(.blue)
                        }
                    }
                }
            }
            .navigationTitle("Ventas")
            .sheet(item: $showingAddPaymentFor) { sale in
                AddPaymentView(orderSale: sale)
            }
            .overlay {
                if sales.isEmpty {
                    ContentUnavailableView("Sin Ventas", systemImage: "cart", description: Text("Convierte una cotización o crea una venta nueva."))
                }
            }
        }
    }
    
    private func statusColor(for status: String) -> Color {
        switch status {
        case "Delivered": return .green
        case "In Process": return .blue
        case "Cancelled": return .red
        default: return .orange
        }
    }
}
