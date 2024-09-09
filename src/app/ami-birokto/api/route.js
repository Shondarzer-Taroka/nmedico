
import nodemailer from 'nodemailer';
import { generateInvoicePDF } from '@/lib/generateInvoice';

export async function POST(req) {
    try {
        const { session } = await req.json(); // Parse JSON directly from the request

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
        // Check if the error is due to missing file or other
        let errorMessage = 'Failed to send invoice email';
        if (error.message.includes('ENOENT')) {
            errorMessage = 'Failed to generate PDF or locate the font file.';
        }

        // Return an error response
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
