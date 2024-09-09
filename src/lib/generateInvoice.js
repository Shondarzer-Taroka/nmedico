// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';

// export const generateInvoicePDF = async (session) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         const filePath = `./invoices/invoice-${session.id}.pdf`;

//         // Ensure directory exists
//         fs.mkdirSync(path.dirname(filePath), { recursive: true });

//         // Register the Helvetica font
//         const fontPath = path.resolve('./fonts/Helvetica.afm');
//         doc.registerFont('Helvetica', fontPath);

//         // Start writing to the file
//         const writeStream = fs.createWriteStream(filePath);
//         doc.pipe(writeStream);

//         // Add content to the PDF
//         doc.font('Helvetica')
//            .fontSize(12)
//            .text(`Invoice for ${session.customer_details.name}`, 100, 100);

//         // Other content of the invoice goes here
//         // ...

//         doc.end();

//         writeStream.on('finish', () => {
//             resolve(filePath);
//         });

//         writeStream.on('error', (err) => {
//             reject(err);
//         });
//     });
// };




// html-pdf

// import htmlPdf from 'html-pdf';
// import path from 'path';

// // Function to generate the PDF
// export const generateInvoicePDF = async (session) => {
//     return new Promise((resolve, reject) => {
//         // Create HTML content for the invoice
//         const htmlContent = `
//             <html>
//             <head>
//                 <style>
//                     body { font-family: Arial, sans-serif; }
//                     .invoice { max-width: 600px; margin: auto; }
//                     .header { text-align: center; }
//                     .footer { text-align: center; margin-top: 20px; }
//                 </style>
//             </head>
//             <body>
//                 <div class="invoice">
//                     <div class="header">
//                         <h1>Invoice</h1>
//                         <p>Thank you for your purchase!</p>
//                         <img src="/assets/avatar4.jpg" alt="Logo" style="width: 100px;">
//                     </div>
//                     <p><strong>Name:</strong> ${session.customer_details.name}</p>
//                     <p><strong>Email:</strong> ${session.customer_details.email}</p>
//                     <p><strong>Session ID:</strong> ${session.id}</p>
//                     <p><strong>Total Amount:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
//                     <h3>Purchased Items</h3>
//                     <table style="width: 100%; border-collapse: collapse;">
//                         <thead>
//                             <tr>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
//                                 <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${session.line_items.data.map(item => `
//                                 <tr>
//                                     <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
//                                     <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${(item.amount_total / 100).toFixed(2)}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>
//                     <div class="footer">
//                         <p>Thank you for your business!</p>
//                     </div>
//                 </div>
//             </body>
//             </html>
//         `;

//         // Set options for PDF generation
//         const options = { format: 'A4' };

//         // Generate PDF from HTML content
//         htmlPdf.create(htmlContent, options).toFile('./invoices/invoice.pdf', (err, res) => {
//             if (err) return reject(err);
//             resolve(res.filename);
//         });
//     });
// };


// // pupper

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = async (session) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Define your HTML content
    const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .invoice { max-width: 600px; margin: auto; }
                .header { text-align: center; }
                .footer { text-align: center; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="header">
                    <h1>Invoice</h1>
                    <p>Thank you for your purchase!</p>
                    <img src="/assets/avatar4.jpg" alt="Logo" style="width: 100px;">
                </div>
                <p><strong>Name:</strong> ${session.customer_details.name}</p>
                <p><strong>Email:</strong> ${session.customer_details.email}</p>
                <p><strong>Session ID:</strong> ${session.id}</p>
                <p><strong>Total Amount:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
                <h3>Purchased Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${session.line_items.data.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${(item.amount_total / 100).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="footer">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        await page.setContent(htmlContent);
        const filePath = `./invoices/invoice-${session.id}.pdf`;
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        await page.pdf({
            path: filePath,
            format: 'A4'
        });

        await browser.close();
        return filePath;
    } catch (error) {
        await browser.close();
        throw error;
    }
};
