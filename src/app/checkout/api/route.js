


// /app/checkout/api/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const POST = async (request) => {
    try {
        const { items, success_url, cancel_url } = await request.json();

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
            success_url: success_url,
            cancel_url: cancel_url,
        });

        return NextResponse.json({ id: session.id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Stripe error', error: error.message }, { status: 500 });
    }
};
