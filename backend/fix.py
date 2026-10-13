import re

with open('src/html.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the broken function map
broken_map = r""return\s*<div class="card !p-4 flex items-center justify-between group relative">[\s\S]*?</div>;""

correct_map = """return '<div class="card !p-4 flex items-center justify-between group relative">' + \\
    '<div>' + \\
        '<div class="flex items-center gap-2 mb-1">' + \\
            '<span class="status-badge">' + q.status + '</span>' + \\
            '<span class="text-xs font-bold text-neutral-400 uppercase tracking-widest">' + new Date(q.created_at).toLocaleDateString() + '</span>' + \\
        '</div>' + \\
        '<h3 class="font-medium text-neutral-900">' + clientName + '</h3>' + \\
        '<p class="text-xs text-neutral-400">' + productName + '</p>' + \\
    '</div>' + \\
    '<div class="flex items-center gap-4">' + \\
        '<span class="font-light text-lg text-brand-navy">' + Number(q.total).toLocaleString('es-MX', {minimumFractionDigits: 2}) + '</span>' + \\
        '<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">' + \\
            '<button onclick="approveQuote(\\'' + q.id + '\\', ' + q.total + ')" class="p-1 text-green-500 hover:text-green-600" title="Aprobar y cobrar">' + \\
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' + \\
            '</button>' + \\
        '</div>' + \\
    '</div>' + \\
'</div>';"""

content = re.sub(broken_map, correct_map, content)

# Now fix generateQuotePDF which is also broken!
broken_pdf = r""template\.innerHTML =\s*<div style="padding: 40px;[\s\S]*?</div>\s*;""
broken_pdf_2 = r""template\.innerHTML =\s*<div style="padding: 40px;[\s\S]*?</div>\s*";""
broken_pdf_3 = r""template\.innerHTML =\s*<div style="padding: 40px;[\s\S]*?</div>\s*;""

correct_pdf = """template.innerHTML = '<div style="padding: 40px; font-family: \\'Helvetica Neue\\', Helvetica, Arial, sans-serif; color: #152336; max-width: 800px; margin: auto;">' + \\
    '<div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #d9664c; padding-bottom: 20px; margin-bottom: 30px;">' + \\
        '<div>' + \\
            '<h1 style="font-size: 32px; font-weight: 300; margin: 0; color: #152336;">COTIZACIÓN</h1>' + \\
            '<p style="font-size: 12px; color: #666; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">Altus MKT Digital</p>' + \\
        '</div>' + \\
        '<div style="text-align: right;">' + \\
            '<p style="margin: 0; font-size: 14px; font-weight: bold;">Folio: #' + quoteData.id.substring(0,8).toUpperCase() + '</p>' + \\
            '<p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">' + new Date().toLocaleDateString() + '</p>' + \\
        '</div>' + \\
    '</div>' + \\
    '<div style="margin-bottom: 40px;">' + \\
        '<p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 5px;">Preparado para:</p>' + \\
        '<h2 style="font-size: 20px; margin: 0;">' + clientName + '</h2>' + \\
    '</div>' + \\
    '<table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">' + \\
        '<thead>' + \\
            '<tr style="border-bottom: 1px solid #eee;">' + \\
                '<th style="text-align: left; padding: 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Descripción</th>' + \\
                '<th style="text-align: right; padding: 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Importe</th>' + \\
            '</tr>' + \\
        '</thead>' + \\
        '<tbody>' + \\
            '<tr style="border-bottom: 1px solid #eee;">' + \\
                '<td style="padding: 15px 0;">' + \\
                    '<p style="margin: 0; font-weight: bold; font-size: 16px;">' + productData.name + '</p>' + \\
                    (productData.desc ? '<p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">' + productData.desc + '</p>' : '') + \\
                '</td>' + \\
                '<td style="text-align: right; padding: 15px 0; font-size: 16px;">' + \\
                    '' + Number(productData.price).toLocaleString('es-MX', {minimumFractionDigits:2}) + \\
                '</td>' + \\
            '</tr>' + \\
        '</tbody>' + \\
    '</table>' + \\
    '<div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">' + \\
        '<div style="width: 300px;">' + \\
            '<div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">' + \\
                '<span style="color: #666;">Subtotal:</span>' + \\
                '<span>' + Number(quoteData.subtotal).toLocaleString('es-MX', {minimumFractionDigits:2}) + '</span>' + \\
            '</div>' + \\
            '<div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">' + \\
                '<span style="color: #666;">IVA (16%):</span>' + \\
                '<span>' + Number(quoteData.taxes).toLocaleString('es-MX', {minimumFractionDigits:2}) + '</span>' + \\
            '</div>' + \\
            '<div style="display: flex; justify-content: space-between; padding: 15px 0; font-size: 20px; font-weight: bold; color: #152336;">' + \\
                '<span>Total:</span>' + \\
                '<span>' + Number(quoteData.total).toLocaleString('es-MX', {minimumFractionDigits:2}) + '</span>' + \\
            '</div>' + \\
        '</div>' + \\
    '</div>' + \\
    (quoteData.notes ? \\
    '<div style="background: #f9f9f9; padding: 20px; border-radius: 8px; font-size: 14px; color: #666;">' + \\
        '<strong>Notas Adicionales:</strong><br/>' + \\
        quoteData.notes.replace(/\\\\n/g, '<br>') + \\
    '</div>' \\
    : '') + \\
    '<div style="margin-top: 50px; text-align: center; font-size: 12px; color: #999;">' + \\
        '<p>Cotización válida por 15 días.</p>' + \\
        '<p>Altus MKT Digital • Confianza y Excelencia</p>' + \\
    '</div>' + \\
'</div>';"""

content = re.sub(broken_pdf, correct_pdf, content)
content = re.sub(broken_pdf_2, correct_pdf, content)
content = re.sub(broken_pdf_3, correct_pdf, content)


with open('src/html.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
