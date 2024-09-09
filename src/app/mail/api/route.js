// import nodemailer from 'nodemailer';

// export async function POST(req) {
//     try {
//         const { session } = await req.json(); // Parse JSON directly from the request
//         console.log(session);

//         // Configure the transporter
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail', // Use your email service
//             auth: {
//                 user: process.env.EMAIL_USER, // Your email
//                 pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//             },
//         });

//         // Send the email with the session details
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: session.customer_details.email, // Send to the customer's email
//             subject: 'Your Purchase Session Details',
//             text: `
//                 Thank you for your purchase.

//                 Session ID: ${session.id}
//                 Customer Name: ${session.customer_details.name}
//                 Customer Email: ${session.customer_details.email}
//                 Total Amount: $${(session.amount_total / 100).toFixed(2)}

//                 Purchased Items:
//                 ${session.line_items.data.map(item => `${item.description} - Quantity: ${item.quantity} - Price: $${(item.price.unit_amount / 100).toFixed(2)}`).join('\n')}
//             `,
//         };

//         await transporter.sendMail(mailOptions);

//         // Return a success response
//         return new Response(JSON.stringify({ message: 'Session details email sent successfully' }), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error('Error sending session details email:', error);
//         // Return an error response
//         return new Response(JSON.stringify({ error: 'Failed to send session details email' }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }






import nodemailer from 'nodemailer';
import { generateInvoicePDF } from '@/lib/generateInvoice';

export async function POST(req) {
    try {
        const { session } = await req.json(); // Parse JSON directly from the request
        // console.log('jhg',session);
        
        // Generate the invoice PDF
        const filePath = await generateInvoicePDF(session);

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Send the email with the invoice attachment and session details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: session.customer_details.email, // Send to the customer's email
            subject: 'Your Invoice from [Your Company]',
            text: `
                Thank you for your purchase.

                Session ID: ${session.id}
                Customer Name: ${session.customer_details.name}
                Customer Email: ${session.customer_details.email}
                Total Amount: $${(session.amount_total / 100).toFixed(2)}

                Purchased Items:
                ${session.line_items.data.map(item => `${item.description} - Quantity: ${item.quantity} - Price: $${(item.price.unit_amount / 100).toFixed(2)}`).join('\n')}
            `,
            attachments: [
                {
                    filename: `invoice-${session.id}.pdf`,
                    path: filePath, // Path to the generated PDF
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        // Return a success response
        return new Response(JSON.stringify({ message: 'Invoice email sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending invoice email:', error);
        // Return an error response
        return new Response(JSON.stringify({ error: 'Failed to send invoice email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}



// bejal

// import nodemailer from 'nodemailer';
// import { generateInvoicePDF } from '@/lib/generateInvoice';

// export async function POST(req) {
//     try {
//         const { session } = await req.json(); // Parse JSON directly from the request

//         // Generate the invoice PDF
//         const filePath = await generateInvoicePDF(session);

//         // Configure the transporter
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail', // Use your email service
//             auth: {
//                 user: process.env.EMAIL_USER, // Your email
//                 pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//             },
//         });

//         // Send the email with the invoice attachment and session details
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: session.customer_details.email, // Send to the customer's email
//             subject: 'Your Invoice from [Your Company]',
//             text: `
//                 Thank you for your purchase.

//                 Session ID: ${session.id}
//                 Customer Name: ${session.customer_details.name}
//                 Customer Email: ${session.customer_details.email}
//                 Total Amount: $${(session.amount_total / 100).toFixed(2)}

//                 Purchased Items:
//                 ${session.line_items.data.map(item => `${item.description} - Quantity: ${item.quantity} - Price: $${(item.price.unit_amount / 100).toFixed(2)}`).join('\n')}
//             `,
//             attachments: [
//                 {
//                     filename: `invoice-${session.id}.pdf`,
//                     path: filePath, // Path to the generated PDF
//                 },
//             ],
//         };

//         await transporter.sendMail(mailOptions);

//         // Return a success response
//         return new Response(JSON.stringify({ message: 'Invoice email sent successfully' }), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error('Error sending invoice email:', error);
//         // Check if the error is due to missing file or other
//         let errorMessage = 'Failed to send invoice email';
//         if (error.message.includes('ENOENT')) {
//             errorMessage = 'Failed to generate PDF or locate the font file.';
//         }

//         // Return an error response
//         return new Response(JSON.stringify({ error: errorMessage }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }


// import nodemailer from 'nodemailer';
// import { generateInvoicePDF } from './path/to/your/pdf-generator';

// // Example function to send an invoice email
// export const sendInvoiceEmail = async (session) => {
//     try {
//         // Generate the PDF
//         const filePath = await generateInvoicePDF(session);

//         // Configure the transporter
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         // Send the email with the invoice attachment
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: session.customer_details.email,
//             subject: 'Your Invoice from [Your Company]',
//             text: `
//                 Thank you for your purchase.

//                 Session ID: ${session.id}
//                 Customer Name: ${session.customer_details.name}
//                 Customer Email: ${session.customer_details.email}
//                 Total Amount: $${(session.amount_total / 100).toFixed(2)}

//                 Purchased Items:
//                 ${session.line_items.data.map(item => `${item.description} - Quantity: ${item.quantity} - Price: $${(item.amount_total / 100).toFixed(2)}`).join('\n')}
//             `,
//             attachments: [
//                 {
//                     filename: `invoice-${session.id}.pdf`,
//                     path: filePath,
//                 },
//             ],
//         };

//         await transporter.sendMail(mailOptions);
//         console.log('Invoice email sent successfully');
//     } catch (error) {
//         console.error('Error sending invoice email:', error);
//     }
// };
