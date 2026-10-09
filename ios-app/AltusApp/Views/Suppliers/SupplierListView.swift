import SwiftUI
import SwiftData

struct SupplierListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Supplier.name) private var suppliers: [Supplier]
    @State private var showingAddSupplier = false
    @State private var showingAddPaymentFor: Supplier?
    @State private var searchText = ""

    var filteredSuppliers: [Supplier] {
        if searchText.isEmpty {
            return suppliers
        } else {
            return suppliers.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
        }
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(filteredSuppliers) { supplier in
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
            .searchable(text: $searchText, prompt: "Buscar proveedor...")
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
                if filteredSuppliers.isEmpty {
                    ContentUnavailableView("Sin Resultados", systemImage: "magnifyingglass", description: Text("No se encontraron proveedores."))
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
