


// /lib/sendEmail.js
import nodemailer from 'nodemailer';
import { generateInvoicePDF } from './generateInvoice';

export const sendInvoiceEmail = async (session) => {
    console.log(session);
    
    try {
        // Generate PDF invoice
        const filePath = await generateInvoicePDF(session);

        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Log the session details for debugging
        console.log('Session: ghjghjhj', session);

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: session.customer_details.email, // Send to the customer's email
            subject: 'Your Invoice from Our Store',
            text: 'Thank you for your purchase. Please find the invoice attached.',
            // attachments: [
            //     {
            //         filename: 'invoice.pdf',
            //         path: filePath
            //     }
            // ]
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Invoice email sent successfully.');

    } catch (error) {
        console.error('Error sending invoice email:', error);
        throw new Error('Failed to send invoice email'); // Optional: Throw to handle error upstream
    }
};
