import Foundation
import SwiftData

enum PaymentMethod: String, Codable, CaseIterable {
    case cash = "Efectivo"
    case debit = "Débito"
    case credit = "Crédito"
}

@Model
final class Expense {
    @Attribute(.unique) var id: UUID
    var desc: String
    var amount: Double
    var paymentMethodRaw: String
    var notes: String?
    var date: Date
    var isSynced: Bool
    
    var paymentMethod: PaymentMethod {
        get { PaymentMethod(rawValue: paymentMethodRaw) ?? .cash }
        set { paymentMethodRaw = newValue.rawValue }
    }
    
    init(id: UUID = UUID(), desc: String, amount: Double, paymentMethod: PaymentMethod, notes: String? = nil, date: Date = Date(), isSynced: Bool = false) {
        self.id = id
        self.desc = desc
        self.amount = amount
        self.paymentMethodRaw = paymentMethod.rawValue
        self.notes = notes
        self.date = date
        self.isSynced = isSynced
    }
}
