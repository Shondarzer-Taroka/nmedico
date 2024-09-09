

// /app/api/checkout/session.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get('session_id');

    try {
        // Retrieve the Stripe session and expand the line items
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items.data.price.product'], // Expanding line items to fetch detailed info
        });

        // Return the session details as JSON
        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        // Handle errors and return an appropriate response
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};

