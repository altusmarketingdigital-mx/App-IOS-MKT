import Foundation

class APIManager {
    static let shared = APIManager()
    
    // Cambia a la IP de tu Mac (ej. 192.168.1.XX) si pruebas en un dispositivo físico
    private let baseURL = "http://localhost:3000/api"
    
    func postClient(_ client: Client) async throws {
        guard let url = URL(string: "\(baseURL)/clients") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "id": client.id.uuidString,
            "name": client.name,
            "phone": client.phone ?? "",
            "email": client.email ?? ""
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (_, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
            throw URLError(.badServerResponse)
        }
    }
    
    func postExpense(_ expense: Expense) async throws {
        guard let url = URL(string: "\(baseURL)/expenses") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let formatter = ISO8601DateFormatter()
        let body: [String: Any] = [
            "id": expense.id.uuidString,
            "description": expense.desc,
            "amount": expense.amount,
            "payment_method": expense.paymentMethod.rawValue,
            "notes": expense.notes ?? "",
            "date": formatter.string(from: expense.date)
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (_, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
            throw URLError(.badServerResponse)
        }
    }
}
