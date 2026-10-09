import Foundation
import SwiftData

@Model
final class Payment {
    @Attribute(.unique) var id: UUID
    @Relationship(inverse: \OrderSale.payments) var order: OrderSale?
    
    var amount: Double
    var paymentMethod: String // "Efectivo", "Débito", "Crédito"
    var date: Date
    var isSynced: Bool

    init(id: UUID = UUID(), amount: Double, paymentMethod: String, date: Date = Date(), isSynced: Bool = false) {
        self.id = id
        self.amount = amount
        self.paymentMethod = paymentMethod
        self.date = date
        self.isSynced = isSynced
    }
}
