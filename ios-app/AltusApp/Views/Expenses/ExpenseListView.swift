import SwiftUI
import SwiftData

struct ExpenseListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Expense.date, order: .reverse) private var expenses: [Expense]
    @State private var showingAddExpense = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(expenses) { expense in
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
                if expenses.isEmpty {
                    ContentUnavailableView("Sin Gastos", systemImage: "creditcard", description: Text("No has registrado gastos aún."))
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
