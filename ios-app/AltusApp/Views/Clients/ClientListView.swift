import SwiftUI
import SwiftData

struct ClientListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Client.name) private var clients: [Client]
    @State private var showingAddClient = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(clients) { client in
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
                if clients.isEmpty {
                    ContentUnavailableView("Sin Clientes", systemImage: "person.3", description: Text("Agrega tu primer cliente para comenzar."))
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
