import Foundation
import SwiftData

@Model
final class OrderSale {
    @Attribute(.unique) var id: UUID
    
    @Relationship(inverse: \Client.orders) var client: Client?
    
    var quoteId: UUID? // Referencia opcional a la cotización de origen
    var total: Double
    var status: String // "Pending", "In Process", "Delivered", "Cancelled"
    var createdAt: Date
    var isSynced: Bool
    
    var payments: [Payment]? = []
    
    init(id: UUID = UUID(), quoteId: UUID? = nil, total: Double, status: String = "Pending", createdAt: Date = Date(), isSynced: Bool = false) {
        self.id = id
        self.quoteId = quoteId
        self.total = total
        self.status = status
        self.createdAt = createdAt
        self.isSynced = isSynced
    }
}
