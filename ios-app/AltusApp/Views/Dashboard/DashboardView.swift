import SwiftUI
import SwiftData
import Charts

struct DashboardView: View {
    @Query private var expenses: [Expense]
    @Query private var payments: [Payment]
    @Query private var sales: [OrderSale]
    @Query private var suppliers: [Supplier]
    
    var totalIncome: Double {
        payments.reduce(0) { $0 + $1.amount }
    }
    
    var totalExpenses: Double {
        expenses.reduce(0) { $0 + $1.amount }
    }
    
    var accountsReceivable: Double {
        let totalSales = sales.reduce(0) { $0 + $1.total }
        return totalSales - totalIncome
    }
    
    var accountsPayable: Double {
        suppliers.reduce(0) { $0 + $1.currentBalance }
    }
    
    var expensesByMethod: [(method: String, amount: Double)] {
        let grouped = Dictionary(grouping: expenses, by: { $0.paymentMethod.rawValue })
        return grouped.map { (key, value) in
            (method: key, amount: value.reduce(0) { $0 + $1.amount })
        }
    }
    
    var cashFlowData: [(type: String, amount: Double)] {
        [
            (type: "Ingresos", amount: totalIncome),
            (type: "Egresos", amount: totalExpenses)
        ]
    }
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    
                    // Tarjetas de Resumen
                    HStack {
                        SummaryCard(title: "Ingresos", amount: totalIncome, color: .green)
                        SummaryCard(title: "Egresos", amount: totalExpenses, color: .red)
                    }
                    .padding(.horizontal)
                    
                    HStack {
                        SummaryCard(title: "Por Cobrar", amount: accountsReceivable, color: .orange)
                        SummaryCard(title: "Por Pagar", amount: accountsPayable, color: .purple)
                    }
                    .padding(.horizontal)
                    
                    // Gráfico 1: Flujo de Caja
                    VStack(alignment: .leading) {
                        Text("Flujo de Caja General")
                            .font(.headline)
                        
                        Chart(cashFlowData, id: \.type) { data in
                            BarMark(
                                x: .value("Monto", data.amount),
                                y: .value("Tipo", data.type)
                            )
                            .foregroundStyle(data.type == "Ingresos" ? Color.green : Color.red)
                            .annotation(position: .trailing) {
                                Text("\(data.amount, format: .currency(code: "MXN"))")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                        .frame(height: 150)
                    }
                    .padding()
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)
                    .padding(.horizontal)
                    
                    // Gráfico 2: Desglose de Gastos
                    VStack(alignment: .leading) {
                        Text("Gastos por Método de Pago")
                            .font(.headline)
                        
                        if expensesByMethod.isEmpty {
                            Text("No hay gastos registrados")
                                .foregroundColor(.secondary)
                                .frame(height: 200)
                        } else {
                            Chart(expensesByMethod, id: \.method) { data in
                                SectorMark(
                                    angle: .value("Monto", data.amount),
                                    innerRadius: .ratio(0.5),
                                    angularInset: 1.5
                                )
                                .foregroundStyle(by: .value("Método", data.method))
                            }
                            .frame(height: 250)
                        }
                    }
                    .padding()
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)
                    .padding(.horizontal)
                    
                }
                .padding(.vertical)
            }
            .navigationTitle("Salud Financiera")
        }
    }
}

// Subvista para las tarjetas métricas
struct SummaryCard: View {
    var title: String
    var amount: Double
    var color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline)
                .foregroundColor(.secondary)
            Text(amount, format: .currency(code: "MXN"))
                .font(.title3)
                .bold()
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}
