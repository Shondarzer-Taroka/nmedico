

import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse JSON from the request
        let newProduct = await request.json();

        // Connect to the database
        let db = await connectDB();
        let productsCollection = db.collection('products');

        // Insert new product
        let result = await productsCollection.insertOne(newProduct);

        // Return success response
        return NextResponse.json(
            { message: 'Product added successfully', result },
            { status: 200 }
        );
    } catch (error) {
        // Return error response
        return NextResponse.json(
            { message: 'Failed to add product', error: error.message },
            { status: 500 }
        );
    }
}
