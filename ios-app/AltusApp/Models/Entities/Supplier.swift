import Foundation
import SwiftData

@Model
final class Supplier {
    @Attribute(.unique) var id: UUID
    var name: String
    var contactInfo: String?
    var initialDebt: Double // Deuda base inicial
    var isSynced: Bool
    
    @Relationship(inverse: \SupplierPayment.supplier) var payments: [SupplierPayment]? = []
    
    var currentBalance: Double {
        let totalPaid = payments?.reduce(0) { $0 + $1.amount } ?? 0
        return initialDebt - totalPaid
    }
    
    init(id: UUID = UUID(), name: String, contactInfo: String? = nil, initialDebt: Double = 0.0, isSynced: Bool = false) {
        self.id = id
        self.name = name
        self.contactInfo = contactInfo
        self.initialDebt = initialDebt
        self.isSynced = isSynced
    }
}
