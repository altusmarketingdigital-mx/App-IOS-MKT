import SwiftUI

@MainActor
class PDFManager {
    static let shared = PDFManager()
    
    private init() {}
    
    // Función genérica para convertir cualquier vista SwiftUI en un archivo PDF
    func render<Content: View>(view: Content, filename: String) -> URL? {
        let renderer = ImageRenderer(content: view)
        
        // Tamaño A4 estándar (puntos)
        renderer.proposedSize = .init(width: 595, height: 842)
        
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("\(filename).pdf")
        
        renderer.render { size, context in
            var box = CGRect(x: 0, y: 0, width: size.width, height: size.height)
            guard let pdf = CGContext(url as CFURL, mediaBox: &box, nil) else { return }
            
            pdf.beginPDFPage(nil)
            // Fondo blanco
            pdf.setFillColor(UIColor.white.cgColor)
            pdf.fill(box)
            
            context(pdf)
            pdf.endPDFPage()
            pdf.closePDF()
        }
        
        return url
    }
}
