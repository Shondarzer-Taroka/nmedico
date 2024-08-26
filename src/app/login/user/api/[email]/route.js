import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
  try {
    // Extracting the email from query parameters
    // const { searchParams } = new URL(request.url);/
    // const email = searchParams.get('email');

    // if (!email) {
    //   return NextResponse.json({ message: 'Email parameter is missing' }, { status: 400 });
    // }

    const db = await connectDB();
    const userCollection = db.collection('users');
    const result = await userCollection.findOne({ email: params.email });

    if (!result) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
