import Foundation
import SwiftData

@Model
final class Client {
    @Attribute(.unique) var id: UUID
    var name: String
    var phone: String?
    var email: String?
    var address: String?
    var isSynced: Bool
    
    // Relaciones (One-to-Many)
    var quotes: [Quote]? = []
    var orders: [OrderSale]? = []
    
    init(id: UUID = UUID(), name: String, phone: String? = nil, email: String? = nil, address: String? = nil, isSynced: Bool = false) {
        self.id = id
        self.name = name
        self.phone = phone
        self.email = email
        self.address = address
        self.isSynced = isSynced
    }
}
