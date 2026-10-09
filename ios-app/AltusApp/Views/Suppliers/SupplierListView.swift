import SwiftUI
import SwiftData

struct SupplierListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Supplier.name) private var suppliers: [Supplier]
    @State private var showingAddSupplier = false
    @State private var showingAddPaymentFor: Supplier?

    var body: some View {
        NavigationStack {
            List {
                ForEach(suppliers) { supplier in
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(supplier.name)
                                .font(.headline)
                            Spacer()
                            if supplier.currentBalance > 0 {
                                Text("Deuda: \(supplier.currentBalance, format: .currency(code: "MXN"))")
                                    .foregroundColor(.red)
                            } else {
                                Text("Liquidado")
                                    .foregroundColor(.green)
                            }
                        }
                        
                        if let contact = supplier.contactInfo {
                            Text(contact)
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .swipeActions(edge: .leading) {
                        if supplier.currentBalance > 0 {
                            Button {
                                showingAddPaymentFor = supplier
                            } label: {
                                Label("Pagar", systemImage: "dollarsign.circle")
                            }
                            .tint(.blue)
                        }
                    }
                }
                .onDelete(perform: deleteSuppliers)
            }
            .navigationTitle("Proveedores")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingAddSupplier = true }) {
                        Label("Añadir", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddSupplier) {
                AddSupplierView()
            }
            .sheet(item: $showingAddPaymentFor) { supplier in
                AddSupplierPaymentView(supplier: supplier)
            }
            .overlay {
                if suppliers.isEmpty {
                    ContentUnavailableView("Sin Proveedores", systemImage: "shippingbox", description: Text("No tienes proveedores registrados."))
                }
            }
        }
    }
    
    private func deleteSuppliers(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(suppliers[index])
            }
        }
    }
}
