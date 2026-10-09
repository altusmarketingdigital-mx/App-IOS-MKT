import SwiftUI
import SwiftData

struct PDFShareItem: Identifiable {
    let id = UUID()
    let url: URL
}

struct QuoteListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Quote.createdAt, order: .reverse) private var quotes: [Quote]
    @State private var showingAddQuote = false
    @State private var pdfURLToShare: PDFShareItem?

    var body: some View {
        NavigationStack {
            List {
                ForEach(quotes) { quote in
                    VStack(alignment: .leading) {
                        HStack {
                            Text(quote.client?.name ?? "Cliente Desconocido")
                                .font(.headline)
                            Spacer()
                            Text(quote.status)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(quote.status == "Pending" ? Color.orange.opacity(0.2) : Color.green.opacity(0.2))
                                .cornerRadius(8)
                        }
                        Text("Total: \(quote.total, format: .currency(code: "MXN"))")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    .swipeActions(edge: .leading) {
                        // Acción rápida solicitada en requerimientos: Convertir a Venta
                        if quote.status == "Pending" {
                            Button {
                                convertToSale(quote: quote)
                            } label: {
                                Label("Vender", systemImage: "cart.fill")
                            }
                            .tint(.green)
                        }
                        
                        // Botón de Compartir (Fase 6)
                        Button {
                            shareQuote(quote)
                        } label: {
                            Label("PDF", systemImage: "square.and.arrow.up")
                        }
                        .tint(.blue)
                    }
                }
                .onDelete(perform: deleteQuotes)
            }
            .navigationTitle("Cotizaciones")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingAddQuote = true }) {
                        Label("Añadir", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddQuote) {
                AddQuoteView()
            }
            .sheet(item: $pdfURLToShare) { urlItem in
                ActivityView(activityItems: [urlItem.url])
            }
            .overlay {
                if quotes.isEmpty {
                    ContentUnavailableView("Sin Cotizaciones", systemImage: "doc.text", description: Text("No has generado cotizaciones aún."))
                }
            }
        }
    }
    
    private func convertToSale(quote: Quote) {
        quote.status = "Converted"
        quote.isSynced = false // Para que se actualice en backend
        
        let newSale = OrderSale(
            quoteId: quote.id,
            total: quote.total,
            status: "Pending",
            isSynced: false
        )
        newSale.client = quote.client
        modelContext.insert(newSale)
        
        try? modelContext.save()
    }

    private func deleteQuotes(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(quotes[index])
            }
        }
    }
    
    // Generación de PDF (Fase 6)
    @MainActor
    private func shareQuote(_ quote: Quote) {
        let template = QuotePDFTemplate(quote: quote)
        if let pdfURL = PDFManager.shared.render(view: template, filename: "Cotizacion_AltusMKT_\(quote.id.uuidString.prefix(5))") {
            pdfURLToShare = PDFShareItem(url: pdfURL)
        }
    }
}
