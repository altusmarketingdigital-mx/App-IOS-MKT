import SwiftUI

struct SalePDFTemplate: View {
    let sale: OrderSale
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Header
            HStack {
                VStack(alignment: .leading) {
                    Text("ALTUS MKT")
                        .font(.system(size: 32, weight: .black))
                        .foregroundColor(.green)
                    Text("Agencia de Marketing Digital")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
                Spacer()
                VStack(alignment: .trailing) {
                    Text("RECIBO DE VENTA")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.gray)
                    Text("Folio: \(sale.id.uuidString.prefix(8))")
                        .font(.system(size: 12))
                    Text("Fecha: \(sale.created_at, style: .date)")
                        .font(.system(size: 12))
                }
            }
            
            Divider()
                .padding(.vertical)
            
            // Datos del Cliente
            VStack(alignment: .leading, spacing: 5) {
                Text("Cobrado a:")
                    .font(.system(size: 14, weight: .bold))
                Text(sale.client?.name ?? "Cliente General")
                    .font(.system(size: 18, weight: .semibold))
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
                .background(Color.green.opacity(0.1))
                
                HStack {
                    Text("Servicios / Productos")
                        .font(.system(size: 14))
                    Spacer()
                    Text("$\(sale.total, specifier: "%.2f")")
                        .font(.system(size: 14))
                }
                .padding()
                
                Divider()
                
                HStack {
                    Spacer()
                    VStack(alignment: .trailing, spacing: 8) {
                        HStack {
                            Text("Total Pagado:")
                                .font(.system(size: 18, weight: .bold))
                            Text("$\(sale.total, specifier: "%.2f")")
                                .font(.system(size: 18, weight: .black))
                                .foregroundColor(.green)
                        }
                    }
                }
                .padding()
            }
            
            Spacer()
            
            // Footer
            VStack(alignment: .center) {
                Divider()
                Text("Este documento es un comprobante de pago.")
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
