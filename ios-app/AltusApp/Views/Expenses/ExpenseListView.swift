import SwiftUI
import SwiftData

struct ExpenseListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Expense.date, order: .reverse) private var expenses: [Expense]
    @State private var showingAddExpense = false
    @State private var searchText = ""

    var filteredExpenses: [Expense] {
        if searchText.isEmpty {
            return expenses
        } else {
            return expenses.filter { $0.desc.localizedCaseInsensitiveContains(searchText) }
        }
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(filteredExpenses) { expense in
                    HStack {
                        VStack(alignment: .leading) {
                            Text(expense.desc).font(.headline)
                            Text(expense.paymentMethod.rawValue)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 2)
                                .background(Color.blue.opacity(0.2))
                                .cornerRadius(8)
                        }
                        Spacer()
                        Text(expense.amount, format: .currency(code: "MXN"))
                            .bold()
                    }
                }
                .onDelete(perform: deleteExpenses)
            }
            .navigationTitle("Gastos")
            .searchable(text: $searchText, prompt: "Buscar gasto...")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingAddExpense = true }) {
                        Label("Añadir", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddExpense) {
                AddExpenseView()
            }
            .overlay {
                if filteredExpenses.isEmpty {
                    ContentUnavailableView("Sin Resultados", systemImage: "magnifyingglass", description: Text("No se encontraron gastos."))
                }
            }
        }
    }

    private func deleteExpenses(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(expenses[index])
            }
        }
    }
}
