import SwiftUI
import SwiftData

struct OrderSaleListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \OrderSale.createdAt, order: .reverse) private var sales: [OrderSale]
    @State private var showingAddPaymentFor: OrderSale?
    @State private var pdfURLToShare: PDFShareItem?

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
                        
                        // Botón PDF Recibo (Fase 6)
                        Button {
                            shareSale(sale)
                        } label: {
                            Label("Recibo", systemImage: "square.and.arrow.up")
                        }
                        .tint(.green)
                    }
                }
            }
            .navigationTitle("Ventas")
            .sheet(item: $showingAddPaymentFor) { sale in
                AddPaymentView(orderSale: sale)
            }
            .sheet(item: $pdfURLToShare) { urlItem in
                ActivityView(activityItems: [urlItem.url])
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
    
    // Generación de PDF (Fase 6)
    @MainActor
    private func shareSale(_ sale: OrderSale) {
        let template = SalePDFTemplate(sale: sale)
        if let pdfURL = PDFManager.shared.render(view: template, filename: "Recibo_AltusMKT_\(sale.id.uuidString.prefix(5))") {
            pdfURLToShare = PDFShareItem(url: pdfURL)
        }
    }
}
