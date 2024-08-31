// /app/api/countByCategory/route.js

import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await connectDB();
        const productsCollection = db.collection('products');

        const categoryCounts = await productsCollection.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    imageUrl: { $first: "$productImage" }
                }
            }
        ]).toArray();

        return NextResponse.json(categoryCounts, { status: 200 });
    } catch (error) {
        console.error("Error counting categories:", error);
        return NextResponse.json({ message: 'not found' }, { status: 500 });
    }
}

export const POST=async(request) => {
    try {
        let product=await request.json()
        let db=await connectDB()
        let selectedCollection=db.collection('selected')
        let result=await selectedCollection.insertOne(product)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json('something went wrong')
    }
}
