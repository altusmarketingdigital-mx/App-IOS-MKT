import SwiftUI

struct QuotePDFTemplate: View {
    let quote: Quote
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Header: Logo / Compañía
            HStack {
                VStack(alignment: .leading) {
                    Text("ALTUS MKT")
                        .font(.system(size: 32, weight: .black))
                        .foregroundColor(.blue)
                    Text("Agencia de Marketing Digital")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
                Spacer()
                VStack(alignment: .trailing) {
                    Text("COTIZACIÓN")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.gray)
                    Text("Folio: \(quote.id.uuidString.prefix(8))")
                        .font(.system(size: 12))
                    Text("Fecha: \(quote.created_at, style: .date)")
                        .font(.system(size: 12))
                }
            }
            
            Divider()
                .padding(.vertical)
            
            // Datos del Cliente
            VStack(alignment: .leading, spacing: 5) {
                Text("Preparado para:")
                    .font(.system(size: 14, weight: .bold))
                Text(quote.client?.name ?? "Cliente General")
                    .font(.system(size: 18, weight: .semibold))
                if let phone = quote.client?.phone, !phone.isEmpty {
                    Text("Tel: \(phone)").font(.system(size: 12))
                }
                if let email = quote.client?.email, !email.isEmpty {
                    Text("Email: \(email)").font(.system(size: 12))
                }
            }
            
            Spacer().frame(height: 30)
            
            // Detalles de Cobro
            VStack(spacing: 0) {
                HStack {
                    Text("Concepto")
                        .font(.system(size: 14, weight: .bold))
                    Spacer()
                    Text("Monto")
                        .font(.system(size: 14, weight: .bold))
                }
                .padding()
                .background(Color.blue.opacity(0.1))
                
                HStack {
                    Text("Servicios de Marketing")
                        .font(.system(size: 14))
                    Spacer()
                    Text("$\(quote.subtotal, specifier: "%.2f")")
                        .font(.system(size: 14))
                }
                .padding()
                
                Divider()
                
                HStack {
                    Spacer()
                    VStack(alignment: .trailing, spacing: 8) {
                        HStack {
                            Text("Subtotal:")
                            Text("$\(quote.subtotal, specifier: "%.2f")").bold()
                        }
                        HStack {
                            Text("Impuestos:")
                            Text("$\(quote.taxes, specifier: "%.2f")").bold()
                        }
                        HStack {
                            Text("Total:")
                                .font(.system(size: 18, weight: .bold))
                            Text("$\(quote.total, specifier: "%.2f")")
                                .font(.system(size: 18, weight: .black))
                                .foregroundColor(.blue)
                        }
                    }
                }
                .padding()
            }
            
            Spacer()
            
            // Footer
            VStack(alignment: .center) {
                Divider()
                Text("Gracias por confiar en Altus MKT.")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(.gray)
                    .padding(.top, 5)
            }
            .frame(maxWidth: .infinity)
        }
        .padding(40)
        .frame(width: 595, height: 842) // A4 Size
        .background(Color.white)
    }
}
