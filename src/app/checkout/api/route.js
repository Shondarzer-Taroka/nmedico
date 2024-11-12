

// this right

// app/checkout/api/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { sendInvoiceEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
    try {
        const { items, success_url, cancel_url } = await request.json();
        
     
        console.log('d',items)
        
        

        // Validate that required fields are present
        if (!items || !success_url || !cancel_url) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.amount, // Amount in cents

                },
                quantity: item.quantity,


            })),
            mode: 'payment',
            success_url: `${success_url}`, // Include the session ID in the success URL
            cancel_url: cancel_url,
            metadata: {
               product_owner:items[0].sellerEmail
            }
        });

        // Fetch session details to include in the email
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items.data'],
        });

        try {
            console.log('gir gir', fullSession);


        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Log error and continue. In production, consider notifying admin or logging to a service
        }

        return NextResponse.json({ id: session.id }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Stripe error', error: error.message }, { status: 500 });
    }
};




// // app/checkout/api/route.js
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// // import { sendInvoiceEmail } from '@/lib/sendEmail';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const POST = async (request) => {
//     try {
//         const { items, success_url, cancel_url } = await request.json();

//         // Validate that required fields are present
//         if (!items || !success_url || !cancel_url) {
//             return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//         }

//         // Ensure amount is in cents
//         const lineItems = items.map(item => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.amount * 100, // Convert amount to cents
//             },
//             quantity: item.quantity,
//         }));

//         // Create a Stripe checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: lineItems,
//             mode: 'payment',
//             success_url,
//             cancel_url,
//             metadata: {
//                 product_owner: items[0]?.sellerEmail || 'unknown',
//             }
//         });

//         // Fetch session details to include in the email (optional)
//         const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
//             expand: ['line_items.data'],
//         });

//         try {
//             // Uncomment and implement sendInvoiceEmail if required
//             // await sendInvoiceEmail(fullSession);
//             console.log('Session details:', fullSession);

//         } catch (emailError) {
//             console.error('Error sending email:', emailError);
//         }

//         return NextResponse.json({ id: session.id }, { status: 200 });
//     } catch (error) {
//         console.error('Stripe error:', error);
//         return NextResponse.json({ message: 'Stripe error', error: error.message }, { status: 500 });
//     }
// };
