import Foundation
import SwiftData

@Model
final class SupplierPayment {
    @Attribute(.unique) var id: UUID
    var supplier: Supplier?
    var amount: Double
    var desc: String?
    var date: Date
    var isSynced: Bool
    
    init(id: UUID = UUID(), amount: Double, desc: String? = nil, date: Date = Date(), isSynced: Bool = false) {
        self.id = id
        self.amount = amount
        self.desc = desc
        self.date = date
        self.isSynced = isSynced
    }
}
