import SwiftUI
import SwiftData

struct AddClientView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var name = ""
    @State private var phone = ""
    @State private var email = ""

    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Información Principal")) {
                    TextField("Nombre del Cliente", text: $name)
                    TextField("Teléfono", text: $phone)
                        .keyboardType(.phonePad)
                    TextField("Correo Electrónico", text: $email)
                        .keyboardType(.emailAddress)
                        .textInputAutocapitalization(.never)
                }
            }
            .navigationTitle("Nuevo Cliente")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancelar") { dismiss() }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Guardar") {
                        let newClient = Client(
                            name: name,
                            phone: phone.isEmpty ? nil : phone,
                            email: email.isEmpty ? nil : email,
                            isSynced: false
                        )
                        modelContext.insert(newClient)
                        // Aquí en el futuro llamaremos a SyncManager para subida offline-first
                        dismiss()
                    }
                    .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
        }
    }
}
