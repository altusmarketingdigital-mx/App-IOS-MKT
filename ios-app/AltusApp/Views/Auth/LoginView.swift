import SwiftUI

struct LoginView: View {
    @AppStorage("isLoggedIn") private var isLoggedIn = false
    @AppStorage("apiKey") private var apiKey = ""
    
    @State private var password = ""
    @State private var showingError = false
    
    // Contraseña maestra para la agencia (Hardcoded por simplicidad Pymes)
    // En producción se valida contra el backend o Supabase Auth.
    private let masterPin = "ALTUS2026"
    
    var body: some View {
        VStack(spacing: 30) {
            Spacer()
            
            VStack(spacing: 10) {
                Image(systemName: "lock.shield.fill")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 80, height: 80)
                    .foregroundColor(.blue)
                
                Text("Altus MKT")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                Text("Agencia Digital")
                    .foregroundColor(.gray)
            }
            
            VStack(spacing: 20) {
                SecureField("PIN de Acceso", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.horizontal, 40)
                    .multilineTextAlignment(.center)
                    .keyboardType(.default)
                
                if showingError {
                    Text("PIN incorrecto. Intenta de nuevo.")
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: login) {
                    Text("Entrar")
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(10)
                        .padding(.horizontal, 40)
                }
            }
            
            Spacer()
            
            Text("Solo personal autorizado")
                .font(.footnote)
                .foregroundColor(.gray)
        }
    }
    
    private func login() {
        if password == masterPin {
            apiKey = "SECRET_TOKEN_ALTUS" // Token para el backend
            withAnimation {
                isLoggedIn = true
            }
        } else {
            showingError = true
            password = ""
        }
    }
}
