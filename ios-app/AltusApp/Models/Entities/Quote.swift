import Foundation
import SwiftData

@Model
final class Quote {
    @Attribute(.unique) var id: UUID
    
    // Relación con el cliente
    @Relationship(inverse: \Client.quotes) var client: Client?
    
    var subtotal: Double
    var taxes: Double
    var total: Double
    var status: String // "Pending", "Converted", "Cancelled"
    var createdAt: Date
    var isSynced: Bool
    
    init(id: UUID = UUID(), subtotal: Double, taxes: Double, total: Double, status: String = "Pending", createdAt: Date = Date(), isSynced: Bool = false) {
        self.id = id
        self.subtotal = subtotal
        self.taxes = taxes
        self.total = total
        self.status = status
        self.createdAt = createdAt
        self.isSynced = isSynced
    }
}
