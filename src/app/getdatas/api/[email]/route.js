import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
  // Extract email from query parameters
  try {
    const db = await connectDB();
    const productsCollection = db.collection('products');
    
    // Find products by email
    const result = await productsCollection.find({ email:params.email}).toArray();
    
    return NextResponse.json({ message: 'Data retrieved successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
