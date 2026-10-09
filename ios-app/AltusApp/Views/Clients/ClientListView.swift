import SwiftUI
import SwiftData

struct ClientListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Client.name) private var clients: [Client]
    @State private var showingAddClient = false
    @State private var searchText = ""

    var filteredClients: [Client] {
        if searchText.isEmpty {
            return clients
        } else {
            return clients.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
        }
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(filteredClients) { client in
                    VStack(alignment: .leading) {
                        Text(client.name)
                            .font(.headline)
                        if let phone = client.phone {
                            Text(phone)
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                    }
                }
                .onDelete(perform: deleteClients)
            }
            .navigationTitle("Clientes")
            .searchable(text: $searchText, prompt: "Buscar cliente...")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingAddClient = true }) {
                        Label("Añadir", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddClient) {
                AddClientView()
            }
            .overlay {
                if filteredClients.isEmpty {
                    ContentUnavailableView("Sin Resultados", systemImage: "magnifyingglass", description: Text("No se encontraron clientes."))
                }
            }
        }
    }

    private func deleteClients(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(clients[index])
            }
        }
    }
}
